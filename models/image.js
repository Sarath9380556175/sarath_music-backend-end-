const mongoose=require('mongoose');
const { schema } = require('./signup');

const Schema=mongoose.Schema;

const images=new Schema({
    imagename:
    {
        type:String,
        required:true
    },
    imagetitle:
    {
        type:String,
        required:true
    }
})

module.exports=mongoose.model('image',images)
