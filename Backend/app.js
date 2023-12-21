require('dotenv').config()
require('express-async-errors');
const express=require('express');
const{ createServer}=require('http')
const {join}=require('path')
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
// Socket.io
const{Server}=require( "socket.io");
const app=express()
const server=createServer(app)
const io=new Server(server)
const authRoute=require('./routes/auth')
const chatRoute=require('./routes/chat')
const messageRoute=require('./routes/message')

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());//required for post request of json data

app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)
app.get("/",(req,res)=>{

    res.sendFile(join(__dirname,"/index.html"))
});
io.on('connection',(socket)=>{
    console.log("a user connected");


socket.on('chat-message',(message)=>{
   
    io.emit('chat-message',message)
})
    socket.on('disconnect',()=>{
        console.log(" user disconnected")
    })
})
const connectDB=require('./db/connect')
const start=async()=>{
try{
   await connectDB(process.env.MONGO_URL)
   server.listen(3000,()=>{
    console.log("server listening at http://localhost:3000")
});
}catch(error){
 console.log(error)
}
}
start();