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
    

//mail sending to user that we are going to add the song which you requested 


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sarathbunny75',
      pass: 'Sarath@9380'
    }
  });
  
  var mailOptions = {
    from: 'sarathbunny75@gmail.com',
    to: email
    ,
 
    subject: 'Sarath_Music_Store',
    html: `<img src="cid:unique@nodemailer.com" style=" text-align: center;" width="100px" height="100px"/> 
    <br/>
    <i style="color:orange">REQUESTED SONG HAS BEEN ADDED TO OUR DATABASE AND WE WILL ADD THE REQUESTED SONG INTO OUR WEBSITE</i>
    <br/>
    <a href="https://skr-music.netlify.app" style="font-style:serif">click here to open sarath-music</a>`
    ,

    attachments:[
        {
            
            path:__dirname+'/companylogo.png',
            cid:'unique@nodemailer.com'
        }
    ]
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});




