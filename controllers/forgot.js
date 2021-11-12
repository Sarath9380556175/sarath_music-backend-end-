const forgot=require('../models/forgotpassword');

var nodemailer = require('nodemailer');

exports.forgotpassword=(req,res)=>{

    const request=req.body;

    const email=request.email;

    const otp = Math.floor(1000 + Math.random() * 9000);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
         type: "SMTP",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: 'sarathbunny75',
          pass: 'Sarath@9380'
        }
      });
      
      
      var mailOptions = {
        from: 'sarathbunny75@gmail.com',
        to: email,
        subject: 'Dont share OTP with anyone',
        text: `${otp}`
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
