const http = require('http');
const WebSocketServer = require("websocket").server;
let connections = [];


const httpServer = http.createServer();

const webSocket = new WebSocketServer({ "httpServer": httpServer });

httpServer.listen(8080, () => console.log("running on port 8080"));


webSocket.on("request", request => {

    const connection = request.accept(null, request.origin);

    connection.on("message", message => {
        // someone just send a message ..
        connections.forEach(c => {
            c.send(`User ${connection.socket.remotePort} says ${message}`);
        });
    })


    connections.push(connection);
    connections.forEach( (c) => {
        c.send(`User${connection.socket.remotePort} just Connected!`)
    });

}) 
