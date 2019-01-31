/****************************************************************************
* Initial setup
*
* Don't forget to run the server with `php -S localhost:9999` in terminal
* open `localhost:9999/02_enterLeave/` with browser
****************************************************************************/

/*
 *************************************  global variables
 */

var posenetServerIP = "172.17.17.85";    // the beauty of websockets is,
                                        // that you can have the server
                                        // running on another computer
                                        // in that case, just put the ip here
                                        // if you want to use the same,
                                        // just do "localhost"

var exampleSocket = new WebSocket("ws://" + posenetServerIP + ":8080");

// store the amount of people in a global variable
// so it's possible to check if someone entered or left
var posesAmount = 0;

/*
 *************************************  events
 */

// here the magic part, we receive the poses!

exampleSocket.onmessage = function (event) {
    const poses = JSON.parse(event.data).poses;

        // let's check if someone entered!
        if (poses.length > posesAmount) {
            // yess... someone did

            // first, update our posesAmount
            // otherwise this would go on forever!
            posesAmount = posesAmount + 1;

            // we want something to happen as well, right?
            // we could just add a rectangle for every person
            
            // first, create an element
            var rectangle = $('<div class="rectangle"></div>');

            // what the heck, let's give it a random background color
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);

            // https://api.jquery.com/css/
            rectangle.css('background-color','rgb('+ r + ',' + b + ',' + b + ')');

            // then add it to the "#all"-div
            // check https://api.jquery.com/find/
            $('#all').append(rectangle);
        }

        // let's check if someone left
        if (poses.length < posesAmount) {
            // oh no.. someone left :(
            // doesn't matter, they probably just want to tell
            // their friends how cool this is

            // first, update our posesAmount
            // otherwise this would go on forever!
            posesAmount = posesAmount - 1;

            // we want something to happen as well, right?
            // we could just remove a rectangle for every person
            
            // check https://api.jquery.com/find/
            // check https://api.jquery.com/last/
            // check https://api.jquery.com/remove/
            $('#all').find('.rectangle').last().remove();
        }
}

