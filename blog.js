// Video->Canvas based on https://github.com/wesbos/HTML5-Face-Detection/blob/master/scripts/scripts.js

// Probably a more thorough way than this
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);

function Background(video, canvas, refresh, blur) {
    this.video = video;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.refresh = refresh ? refresh : 60;
    this.blur = blur ? blur : 10;

    var bg = this;
    navigator.getMedia(
        {'audio': false, 'video': true},
        function(stream) { bg.videoStarted.call(bg, stream); },
        function(err) { bg.error.call(bg, err); }
    );
};

Background.prototype.error = function(err) {
    console.error('navigator.getUserMedia', err.name, err);
    if (err.name == 'PERMISSION_DENIED') {
        console.info("If you're accessing this page using a file:// uri, it won't work in some browsers. Use a HTTP server instead.");
    }
};

Background.prototype.videoStarted = function(stream) {
    this.video.src = window.URL.createObjectURL(stream);

    this.start();
};

Background.prototype.draw = function() {
    // draw webcam frame to canvas
    // todo: better scaling - webcam resolution?
    this.context.drawImage(this.video,
        // dest
        0, 0, this.video.videoWidth, this.video.videoHeight,
        // source
        0, 0, this.canvas.width, this.canvas.height
    );

    // apply blur
    stackBlurCanvasRGBA(this.canvas, 0, 0, this.canvas.width, this.canvas.height, this.blur);
};

Background.prototype.start = function() {
    // Don't start multiple times
    if (this.timeout) {
        clearInterval(this.timeout);
    }

    // Redraw the canvas every so often
    var bg = this;
    this.timeout = setInterval(function() {
        bg.draw.call(bg);
    }, this.refresh);
};
