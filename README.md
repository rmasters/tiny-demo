> Carrying on the valiant trend of "if it appears on Hacker News, an open-source
> demo will emerge shortly"...

A stab at the live-camera UI in [*Tiny*][verge]. Obviously full credits for the
concept go to Rose, Hemeon and Zinssmeister. I'm just messing around.

## Running

Clone the repository. Chrome (at least) won't let you access the webcam and
microphone APIs from `file:///` URIs, so you'll need to serve it up:

    git clone https://github.com/rmasters/tiny-demo.git
    cd tiny-demo
    python -m SimpleHTTPServer

## Uses

1.  [StackBlur.js](https://github.com/Quasimondo/QuasimondoJS/blob/master/blur/StackBlur.js) by @Quasimondo
2.  Learned how to make the video -> canvas leap from [@wesbos](https://github.com/wesbos/HTML5-Face-Detection/blob/master/scripts/scripts.js)

## Caveats

1.  Only tested in Chrome, should work in Firefox and IE11 though.
2.  Performance is a bit nutty, might be the blurring. Pausing while the page is
    in the background might help.
3.  The webcam image could be scaled up better.

[verge]: http://www.theverge.com/2013/12/16/5215918/kevin-roses-tiny-reimagines-blogging-with-voyeuristic-video
