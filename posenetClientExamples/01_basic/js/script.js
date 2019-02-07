/****************************************************************************
* Initial setup
*
* Don't forget to run the server with `php -S localhost:9999` in terminal
* open `localhost:9999/01_basic/` with browser
****************************************************************************/

/*
 *************************************  global variables
 */

var posenetServerIP = "192.168.1.107";    // the beauty of websockets is,
                                        // that you can have the server
                                        // running on another computer
                                        // in that case, just put the ip here
                                        // if you want to use the same,
                                        // just do "localhost"

var exampleSocket = new WebSocket("ws://" + posenetServerIP + ":8080");

var rectangleLeft = 0;
var rectangleTop = 0;
var smoothing = 0.95;

// the middle is half of our video input
// so we can use that here
// see what you put as resolution for your webcam!
var middleX = 640;
var middleY = 360;

/*
 *************************************  events
 */

// here the magic part, we receive the poses!

exampleSocket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const poses = data.poses;
    // we only check the first pose
    // because this is the basic example
    firstPose = poses[0];
    console.log(data);
    // our center point is the nose, because that is visible most of the time and it is in the center
    var center = firstPose.keypoints[SkeletonDefinitions.Nose];
    // now let's apply that to calues we use for our rectangle
    rectangleLeft = rectangleLeft * smoothing + (1.0-smoothing) * (center.position.x-640);
    rectangleTop = rectangleTop * smoothing + (1.0-smoothing) * (center.position.y-360);
    // and then apply it to it via css
    $('.rectangle').css('left',rectangleLeft + 'px');
    $('.rectangle').css('top',rectangleTop + 'px');
}

