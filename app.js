const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", function (socket){
    socket.on("send-location", function (data){ // Through this code we recieve data from Frontend
        io.emit("receive-location",{id:socket.id, ...data}) // By this code We after modifying data we send to Frontend again 
    })
    console.log("connected socket")

    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id)
    });
    console.log("socket disconnected");

})

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req, res)=>{
    res.render("index")
});

server.listen(3000, ()=>{
    console.log("Port 3000 Running")
})