const forgot=require('../models/forgotpassword');
const { Auth } = require("two-step-auth");
var nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

exports.forgotpassword=(req,res)=>{

    const request=req.body;


    const skr=request.skr;

    const useremail=request.useremail;

    const otp = Math.floor(1000 + Math.random() * 900000);

    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;  
    
    const client = new twilio(accountSid, authToken);
    
client.messages.create({
        body: `OTP for verification is: ${otp}`,
        to: `+91${skr}`, 
        from: '+12052936546'
    })
    .then((message) => console.log(message.sid));


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sarathbunny75',
          pass: 'Sarath@9380'
        }
      });
      
      var mailOptions = {
        from: 'sarathbunny75@gmail.com',
        to: useremail
        ,
     
        subject: 'Sarath_Music_Store',
        html: `OTP FOR  FORGOT PASSWORD IS : ${otp}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
   
    const forgots=new forgot({otp:otp})

    forgots.save()

}

exports.isotpvalid=(req,res)=>{

    const request=req.body;

    const otp=request.otp;

    forgot.find({otp:otp})

    .then(response=>{response.length!==0?res.status(200).json({otp:true}):res.status(200).json({otp:false})})

    .catch(error=>res.status(500).json({err:error}))
}

exports.deleteotp=(req,res)=>{
    const request=req.body;

    const otp=request.otp;

    forgot.deleteMany({otp:otp})

    .then(res.status(200).json({Message:'otp deleted successfully'}))

    .catch(res.status(500).json({error:'error'}))
}

exports.authentication=(req,res)=>{

   

        const request=req.body;
    
    
        const skr=request.skr;
    
        const useremail=request.useremail;
    
        async function login(emailId) {
            const rest = await Auth(emailId);
            // You can follow this approach,
            // but the second approach is suggested,
            // as the mails will be treated as important
            const res = await Auth(emailId, "Sarath Music");
            console.log(res);
            console.log(res.useremail);
            const otp=res.OTP
            console.log(res.success);
         
        
    
        const accountSid = process.env.TWILIO_ACCOUNT_SID; 
        const authToken = process.env.TWILIO_AUTH_TOKEN;  
        
        const client = new twilio(accountSid, authToken);
        
        client.messages.create({
            body: `OTP for verification is: ${otp}`,
            to: `+91${skr}`, 
            from: '+12052936546'
        })
        .then((message) => console.log(message.sid));
        
    
    
        const forgots=new forgot({otp:otp})
    
        forgots.save()
    
    }
    login(useremail);
    }
