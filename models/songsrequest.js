const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const songrequestdetails=new Schema({
    email:
    {
type:String,
required:true
    },
    songname:
    {
        type:String,
        required:true
    },
    moviename:
    {
        type:String,
        required:true
    },
    language:
    {
        type:String,
        required:true
    },
    emailid:
    {
        type:String,
        required:true
    }


})

module.exports=mongoose.model('requestedsong',songrequestdetails)