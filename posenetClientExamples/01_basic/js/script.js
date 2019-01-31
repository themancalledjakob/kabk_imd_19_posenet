/****************************************************************************
* Initial setup
*
* Don't forget to run the server with `node index.js` in terminal
* open `localhost:8080/01_basic` with browser
****************************************************************************/

// global variables
var exampleSocket = new WebSocket("ws://localhost:8080");

var rectangleLeft = 0;
var rectangleTop = 0;
var smoothing = 0.9;

// the middle is half of our video input
// so we can use that here
// see what you put as resolution for your webcam!
var middleX = 640;
var middleY = 360;

/****************************************************************************
* The following lines consist mainly of code
****************************************************************************/

// here the magic part, we receive the poses!

exampleSocket.onmessage = function (event) {
    const poses = JSON.parse(event.data).poses;
    // we only check the first pose
    // because this is the basic example
    firstPose = poses[0];
    console.log(firstPose);
    // our center point is the nose, because that is visible most of the time and it is in the center
    var center = firstPose.keypoints[SkeletonDefinitions.Nose];
    // now let's apply that to calues we use for our rectangle
    rectangleLeft = rectangleLeft * smoothing + (1.0-smoothing) * (center.position.x-640);
    rectangleTop = rectangleTop * smoothing + (1.0-smoothing) * (center.position.y-360);
    // and then apply it to it via css
    $('.rectangle').css('left',rectangleLeft + 'px');
    $('.rectangle').css('top',rectangleTop + 'px');
}

