const signups=require('../models/signup');
var nodemailer = require('nodemailer');



exports.postsignup=(req,res)=>{

    const request=req.body;

    const email=request.email;

    const password=request.password;

    const mysignupdetails=new signups({email:email,password:password})

    mysignupdetails.save()

    .then(response=>res.status(200).json({message:'signup details stored successsfully'}))

    .catch(err=>res.status(500).json({error:err}))

}

exports.checksignup=(req,res)=>{
    const request=req.body;

    const email=request.email;

    signups.find({email:email})

    .then(response=>{response.length!==0?res.status(200).json({userexist:true}):res.status(200).json({userexist:false})})

    .catch(error=>res.status(500).json({err:error}));
}

exports.login=(req,res)=>{
    const request=req.body;

    const email=request.email;

    const password=request.password;

signups.find({email:email,password:password})

.then(response=>{response.length!==0?res.status(200).json({login:true,userdetails:response}):res.status(200).json({login:false,userdetails:response})})

.catch(err=>res.status(500).json({error:err}))

}

exports.updatepassword=(req,res)=>{

    const request=req.body;
    const password=request.password;
    var email = { email: request.email};
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

exports.sendnotifications=(req,res)=>{

   
const request=req.body;

const mails=request.mails;

const notification=request.notification;

const image=request.image;
  
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sarathbunny75',
              pass: 'Sarath@9380'
            }
          });
          
          var mailOptions = {
            from: 'sarathbunny75@gmail.com',
            to: mails.map((item)=>{
                return item
            })
            ,
         
            subject: 'Sarath_Music_Store',
            html: `<img src="cid:unique@nodemailer.com" style=" text-align: center;" width="100px" height="100px"/> 
            <br/>
            <i style="color:orange">${notification}</i>
            <br/>
            <a href="https://skr-music.netlify.app" style="font-style:serif">click here to open sarath-music</a>`
            ,

            attachments:[
                {
                    
                    path:__dirname+`/${image}`,
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
   
     
    }
 
   


