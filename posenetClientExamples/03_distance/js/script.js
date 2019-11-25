/****************************************************************************
* Initial setup
*
* Don't forget to run the server with `php -S localhost:9999` in terminal
* open `localhost:9999/03_distance/` with browser
****************************************************************************/

/*
 *************************************  global variables
 */

var posenetServerIP = "localhost";    // the beauty of websockets is,
                                        // that you can have the server
                                        // running on another computer
                                        // in that case, just put the ip here
                                        // if you want to use the same,
                                        // just do "localhost"

var exampleSocket = new WebSocket("ws://" + posenetServerIP + ":9090");

var smoothing = 0.95;

var distance = 0;


/*
 *************************************  events
 */

// here the magic part, we receive the poses!

exampleSocket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const poses = data.poses;
    const width = data.image.width;
    const height = data.image.height;
    // we only check the first pose
    // because this is the basic example
    firstPose = poses[0];
    // we calculate the distance between ears.
    // the bigger this distance, the closer the person
    var newDistance = getDistance(
        firstPose.keypoints[SkeletonDefinitions.LeftEar],
        firstPose.keypoints[SkeletonDefinitions.RightEar],
        false // if it runs too slow, try setting this to true instead of false
    );
    // now let's apply that to calues we use for our rectangle
    distance = distance * smoothing + (1.0-smoothing) * newDistance;
    // and then apply it to it via css
    // we have to Math.floor(), because we can't place things on "half a pixel" ;-)
    // https://www.w3schools.com/jsref/jsref_floor.asp
    $('.rectangle').css('width',Math.floor(distance) + 'px');
    $('.rectangle').css('height',Math.floor(distance) + 'px');
}

function getDistance(a,b,fast=true) {
    if (fast) {
        return Math.abs(a.position.x - b.position.x);
    } else {
        var x = a.position.x - b.position.x;
        var y = a.position.y - b.position.y;
        return Math.sqrt(x*x + y*y);
    }
}
