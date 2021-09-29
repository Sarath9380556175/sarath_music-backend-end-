const songs=require('../models/music')

exports.getsongsbylanguage=(req,res)=>
{
   const request=req.body;

   const language=request.language;

   songs.find({language:language})

   .then(response=>res.status(200).json({music:response}))

   .catch(error=>res.status(500).json({err:error}))
}

exports.getsongsbyname=(req,res)=>{

   const request=req.body;

   const songname=request.songname;

   songs.find({songname:songname})

   .then(response=>{response.length!==0?res.status(200).json({songnames:response,issongexist:true}):res.status(200).json({songnames:response,issongexist:false})})

   .catch(err=>res.status(500).json({error:err}));
}
