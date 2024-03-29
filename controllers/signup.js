const signups=require('../models/signup');
var nodemailer = require('nodemailer');
const forgotpass=require('../models/forgotpassword');
const requestedsongs=require('../models/songsrequest');
const { Auth } = require("two-step-auth");
require('dotenv').config();

exports.postsignup=(req,res)=>{

    const request=req.body;

    const email=request.email;

    const useremail=request.useremail;

    const password=request.password;

    const mysignupdetails=new signups({mobilenumber:email,password:password,email:useremail})

    mysignupdetails.save()

    .then(response=>res.status(200).json({message:'signup details stored successsfully'}))

    .catch(err=>res.status(500).json({error:err}))

}

exports.checksignup=(req,res)=>{
    const request=req.body;

    const email=request.email;

    signups.find({mobilenumber:email})

    .then(response=>{response.length!==0?res.status(200).json({userexist:true}):res.status(200).json({userexist:false})})

    .catch(error=>res.status(500).json({err:error}));
}

exports.login=(req,res)=>{
    const request=req.body;

    const email=request.email;

    const password=request.password;

signups.find({mobilenumber:email,password:password})

.then(response=>{response.length!==0?res.status(200).json({login:true,userdetails:response}):res.status(200).json({login:false,userdetails:response})})

.catch(err=>res.status(500).json({error:err}))

}

exports.updatepassword=(req,res)=>{

    const request=req.body;
    const password=request.password;
    var email = { mobilenumber: request.email};
  var newvalues = { $set: {password:password} };

  signups.updateOne(email,newvalues)

  .then(res.status(200).json({message:'password updated successfully'}))

  .catch(res.status(500).json({message:'error'}))

}

exports.getmails=(req,res)=>{

 

    signups.find()

    .then(response=>res.status(200).json({mail:response.map((item)=>{
        return item.email;
    })}))

    .catch(err=>res.status(500).json({error:err}))
}



exports.getmobilenumbers=(req,res)=>{

 

  signups.find()

  .then(response=>res.status(200).json({mobilenumber:response.map((item)=>{
      return item.mobilenumber;
  })}))

  .catch(err=>res.status(500).json({error:err}))
}

exports.sendmails=(req,res)=>{


  requestedsongs.find()

  .then(response=>res.status(200).json({mailids:response.map((item)=>{
      return item.emailid;
  })}))

  .catch(err=>res.status(500).json({error:err}))
}



exports.sendotpverification=(req,res)=>{

  const request=req.body;

  const email=request.email;

  async function login(emailId) {
    
    // You can follow this approach,
    // but the second approach is suggested,
    // as the mails will be treated as important
    const res = await Auth(emailId, "Sarath Music");
    console.log(res);
    console.log(res.email);
    const otp=res.OTP
    console.log(res.success);
 

const forgots=new forgotpass({otp:otp})

    forgots.save()

}
login(email);
}

exports.deactivateemail=(req,res)=>{

  const request=req.body;

  const email=request.email;

  signups.find({email:email})

  .then(response=>{response.length!==0?res.status(200).json({canwedeactivate:true}):res.status(200).json({canwedeactivate:false})})

  .catch()

}


exports.deactivateotpverification=(req,res)=>{

  const request=req.body;

  const email=request.email;

  async function login(emailId) {
    
    // You can follow this approach,
    // but the second approach is suggested,
    // as the mails will be treated as important
    const res = await Auth(emailId, "Sarath Music");
    console.log(res);
    console.log(res.email);
    const otp=res.OTP
    console.log(res.success);
 

const forgots=new forgotpass({otp:otp})

    forgots.save()

}
login(email);
}
exports.deactivateaccount=(req,res)=>{

  const request=req.body;

  const email=request.email;

  signups.deleteMany({email:email})

  .then(res.status(200).json({Message:'account  deactivated successfully'}))

  .catch(res.status(500).json({error:'error'}))

}
 
   


