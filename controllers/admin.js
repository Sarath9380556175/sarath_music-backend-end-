const admin=require('../models/admin');
const requestedsongs=require('../models/songsrequest')
var nodemailer = require('nodemailer');
const twilio = require('twilio');
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
    
  
      const { SocketLabsClient } = require('@socketlabs/email');

    const serverId = 42055;
    const injectionApiKey = "Gz62Ncp9W4Kis7SDy58R";
    
    const clients = new SocketLabsClient(serverId, injectionApiKey);
    
    const message = {
        to: emailId,
        from: "sarathbunny75@gmail.com",
        subject: "Sarath Music",
        htmlBody:`<i style="color:orange">REQUESTED SONG HAS BEEN ADDED TO OUR DATABASE AND WE WILL ADD THE REQUESTED SONG INTO OUR WEBSITE</i>
        <br/>
        <a href="https://skr-music.netlify.app" style="font-style:serif">click here to open sarath-music</a>`,
        messageType: 'basic'
       
    };

    clients.send(message).then(
      (res) => {
          //Handle successful API call
          console.log(res);
      },
      (err) => {
          //Handle error making API call
          console.log(err);
      });
    

    
    

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
    
    const { SocketLabsClient } = require('@socketlabs/email');
  
      const serverId = 42055;
const injectionApiKey = "Gz62Ncp9W4Kis7SDy58R";

const clients = new SocketLabsClient(serverId, injectionApiKey);

const message = {
    to: email,
    from: "sarathbunny75@gmail.com",
    subject: "Sarath Music",
    htmlBody:`<i style="color:orange">DEAR USER,THE SONG WHICH YOU REQUESTED HAS BEEN ADDED TO OUR WEBSITE!CLICK THE LINK BELOW AND ENJOY LISTENING SONGS
    THANKYOU!</i>
    <br/>
    <a href="https://skr-music.netlify.app" style="font-style:serif">click here to open sarath-music</a>`,
    messageType: 'basic'
   
};

clients.send(message).then(
  (res) => {
      //Handle successful API call
      console.log(res);
  },
  (err) => {
      //Handle error making API call
      console.log(err);
  });
   

}
