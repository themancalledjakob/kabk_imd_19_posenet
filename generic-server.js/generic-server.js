"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-imd-generic';
// Port where we'll run the websocket server
var webSocketsServerPort = 8080;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
/**
 * Global variables
 */

// we use this variable to save the connections to all the clients
var clients = [];

/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port " +
        webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    
    clients.push(connection)

    var userColor = false;
    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function (message) {
        if (message.type === 'utf8') { 

            //var data = JSON.parse(message.utf8Data);

            // whatever the message is, we will send it to all the clients
            //var json = JSON.stringify({ type:'generic-message', data: data });
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(message.utf8Data);
            }            
        }
    });
    
    // user disconnected
    connection.on('close', function (connection) {
        if (userColor !== false) {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        }
    });
});
