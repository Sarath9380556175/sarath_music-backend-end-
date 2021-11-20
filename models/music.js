const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const music=new Schema({
    language:
    {
        type:String,
        required:true
    },
    audiopath:
    {
        type:String,
        required:true
    },
    songname:
    {
        type:Array,
        required:true
    },
    singers:
    {
       type:Array,
       required:true 
    },
    music:
    {
        type:Array,
        required:true
    },
    image:
    {
        type:String,
        required:true
    },
    moviename:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('song',music)
