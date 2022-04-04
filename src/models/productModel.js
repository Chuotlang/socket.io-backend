const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    title:String,
    price:Number,
    image:String,
    reviewer:Number,
    rating:Number
},{
    timestamps:true
});

module.exports = mongoose.model("Products",productSchema);