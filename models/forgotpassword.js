const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const forgotpassword=new Schema({
    otp:
    {
        type:String,
        required:true
    }
})

module.exports=mongoose.model('forgotpassword',forgotpassword)