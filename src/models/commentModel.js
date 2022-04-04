const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    username:String,
    content:String,
    product_id:String,
    rating:{
        type:Number,
        default:0
    },
    reply:Array
},{
    timestamps:true
});

module.exports = mongoose.model("Comments",commentSchema);