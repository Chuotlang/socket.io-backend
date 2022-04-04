const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();
const router = require('./routes/index');

const Comments = require('./models/commentModel');

app.use(express.json());
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = [];
io.on("connection",socket =>{

    socket.on("joinRoom",id => {
        const user = {userId:socket.id , room:id};

        const check = users.every(user => user.userId !== socket.id);
        if(check){
            users.push(user);
            socket.join(user.room);
        }
        else{
            users.map(user => {
                if(user.userId === socket.id){
                    if(user.room !== id){
                        socket.leave(user.room);
                        socket.join(id);
                        user.room = id;
                    }
                }
            })
        }
    })

    socket.on("createComment",async data => {
        const {username,content,product_id,rating,createAt,send} = data;
        const comment = new Comments({
            username,content,product_id,rating,createAt
        });
        if(send ==='replyComment'){
            const {_id,username,content,product_id,rating,createAt} = comment;
            const commentd = await Comments.findById(product_id);
            if(commentd){
                commentd.reply.push({_id,username,content,product_id,rating,createAt});
                await commentd.save();
                io.to(comment.product_id).emit("sendReplyToClient",comment);
            }
        }
        else{
            await comment.save();
            io.to(comment.product_id).emit('sendCommentToClient',comment);
        }
    })



    socket.on("disconnect",() => {
        console.log("disconnected");
    })
});

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})   
    .then(() =>console.log("Connected to database."))
    .catch(err => console.log(`Your error:${err}`));

const PORT = process.env.PORT || 5000;

router(app);

http.listen(PORT, () =>console.log(`Connected to port:${PORT}`));
