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

exports.findbymoviename=(req,res)=>{
   const request=req.body;

   const moviename=request.moviename;

   songs.find({moviename:moviename})

   .then(response=>{response.length!==0?res.status(200).json({moviesongs:response,ismovieexist:true}):res.status(200).json({moviesongs:response,ismovieexist:false})})

   .catch(err=>res.status(500).json({error:err}))
}

exports.findbymusicdirector=(req,res)=>{
   const request=req.body;

   const musicdirector=request.musicdirector;

   songs.find({music:musicdirector})

   .then(response=>{response.length!==0?res.status(200).json({musicdirector:response,isdirectorexist:true}):res.status(200).json({musicdirector:response,isdirectorexist:false})})

   .catch(err=>res.status(500).json({error:err}))
}


exports.findbysingername=(req,res)=>{
   const request=req.body;

   const singername=request.singername;

   

   songs.find({singers:singername})

   .then(response=>{response.length!==0?res.status(200).json({singernames:response,issingerexist:true}):res.status(200).json({singernames:response,issingerexist:false})})

   .catch(err=>res.status(500).json({error:err}))
}

