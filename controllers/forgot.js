const forgot=require('../models/forgotpassword');
const {google}=require('googleapis')
var nodemailer = require('nodemailer');

exports.forgotpassword=(req,res)=>{

    const request=req.body;

    const email=request.email;

    const otp = Math.floor(1000 + Math.random() * 9000);

   const CLIENT_ID='662761358082-81ivmtbmppn3rve2mt62vldfhlukqulj.apps.googleusercontent.com';
    const CLIENT_SECRET='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';
    const REDIRECT_URI='https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN='1//046RVigybpkyTCgYIARAAGAQSNwF-L9Ir1KKAKhbL2YmiBWK-C9zIXNvM5d-4mROhidnUkXryh7byfyWR8SqWR4tvj-FKNBVWS3U';
    
    const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
    
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


    
const accessToken=oAuth2Client.getAccessToken();

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:'sarathbunny75@gmail.com',
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken,

    }
})

const mailOptions={
    from:'sarathbunny75@gmail.com',
    to:email,
    subject:'Dont share OTP with anyone',
    text:`${otp}`

}

transport.sendMail(mailOptions, function(error, info){
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
