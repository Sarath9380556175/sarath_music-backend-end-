const admin=require('../models/admin');
const requestedsongs=require('../models/songsrequest')
var nodemailer = require('nodemailer');
const twilio = require('twilio');
const sgmail=require('@sendgrid/mail')
require('dotenv').config();
exports.postadminpassword=(req,res)=>{

    const request=req.body;

    const username=request.username;

    const password=request.password;

    admin.find({username:username,password:password})

    .then(response=>{response.length!==0?res.status(200).json({isadminverified:true}):res.status(200).json({isadminverified:false})})

    .catch(err=>res.status(500).json({error:err}))

}

exports.postyoursongs=(req,res)=>{
    const request=req.body;

    const emailId=request.emailId;

    const email=request.email;

    const songname=request.songname;

    const moviename=request.moviename;

    const language=request.language;


    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;  
    
    const client = new twilio(accountSid, authToken);
    
    client.messages.create({
        body: `Dear user,we received your song request and we will upload the song in 1-2 business days
Sarath Music
Thank YOU`,
        to: `+91${email}`, 
        from: '+12052936546'
    })
    .then((message) => console.log(message.sid));
    
   const API_KEY='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';

    sgmail.setApiKey(API_KEY)

    const message=
    {
      to:emailId,
      from:'sarath.bujala@zensark.com',
      subject:'Sarath Music',
      html:`<h4>Dear user the song which you requested has been added into our database and we will upload the song in 1-2 business days.
      <br/>
      Thankyou
      <br/>
      Sarath Music</h4>`
      
    };

    sgmail.send(message)

    .then(response=>console.log(response))

    .catch(error=>console.log(error.message))

    
   
    

const songs=new requestedsongs({email:email,songname:songname,moviename:moviename,language:language,emailid:emailId})

songs.save()


}

exports.get_all_customer_emails=(req,res)=>{

  const request=req.body;

  

    requestedsongs.find()

    .then(response=>res.status(200).json({mails:response.map((item)=>{
        return item.email;
    })}))

    .catch(err=>res.status(500).json({error:err}))
}


exports.requestedsongsnotifications=(req,res)=>{

    const request=req.body;

    const mails=request.mails;

const email=request.email;



const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;  

const client = new twilio(accountSid, authToken);


client.messages.create({
    body: `Dear user,The song which you are requested has been added into the songs collection.open the app and enjoy the music.
Thank YOU
Sarath Music`,
    to:`+91${mails}`
,
    from: '+12052936546'
})
.then((message) => console.log(message.sid));
    
    const API_KEY='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';

sgmail.setApiKey(API_KEY)

const message=
{
  to:email,
  from:'sarath.bujala@zensark.com',
  subject:'Sarath Music',
  html:`<h4>Dear user the song which you requested has been added into our website.click the below link to enjoy listening the songs.
  <br/>
  <a href="https://skr-music.netlify.app" style="font-style:serif">click here to open sarath-music</a>
  <br/>
  Thankyou
  <br/>
  Sarath Music</h4>`
  
};

sgmail.send(message)

.then(response=>console.log(response))

.catch(error=>console.log(error.message))



   

}
