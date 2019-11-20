//const http = require("http")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

const PORT = process.env.PORT|| 3004


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/socket-client.html")
})

io.on("connection", client => {
    console.log("client connected")
    client.emit("ack", { "status": "ack" })


    client.on("message", ({whoami,message}) => {
        client.emit("message", {"whoami":"Me","message":message})
        client.broadcast.emit("message", {whoami,message})

    })

    client.on("disconnect", client => {
        console.log("server disconnected")
    })
})


server.listen(PORT, () => {
    console.log("server running on "+PORT)
})