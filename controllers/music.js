const songs=require('../models/music')

exports.getsongsbylanguage=(req,res)=>
{
   const request=req.body;

   const language=request.language;

   const page=request.page ? request.page :1; //ternary operator
   const countperpage=4;
   let startindex=(page*countperpage)-countperpage;
 let endindex=(page*countperpage);

   songs.find({language:language})

   .then(response=>{
      
      const filterpage=response.slice(startindex,endindex);
      const pagecount=Math.ceil(response.length/4);
      let pagecountarr=[];
      for(i=1;i<=pagecount;i++)
      {
          pagecountarr.push(i);
      }
      
      res.status(200).json({music:filterpage,pagecount:pagecount,pagecounts:pagecountarr})})

   .catch(error=>res.status(500).json({err:error}))
}

exports.getsongsbyname=(req,res)=>{

   const request=req.body;

   const songname=request.songname;
   const language=request.language;
   const page=request.page ? request.page :1; //ternary operator
   const countperpage=2;
   let startindex=(page*countperpage)-countperpage;
 let endindex=(page*countperpage);

   songs.find({songname:songname,language:language})

   .then(response=>{
      
      const filterpage=response.slice(startindex,endindex);
      const pagecount=Math.ceil(response.length/2);
      let pagecountarr=[];
      for(i=1;i<=pagecount;i++)
      {
          pagecountarr.push(i);
      }
      
      response.length!==0?res.status(200).json({songnames:filterpage,issongexist:true,pagecount:pagecount,pagecounts:pagecountarr}):res.status(200).json({songnames:filterpage,issongexist:false,pagecount:pagecount,pagecounts:pagecountarr})})

   .catch(err=>res.status(500).json({error:err}));
}

exports.findbymoviename=(req,res)=>{
   const request=req.body;

  
   const language=request.language;
   const moviename=request.moviename;
   const page=request.page ? request.page :1; //ternary operator
   const countperpage=2;
   let startindex=(page*countperpage)-countperpage;
 let endindex=(page*countperpage);


   songs.find({moviename:moviename,language:language})

   .then(response=>{
      
      const filterpage=response.slice(startindex,endindex);
      const pagecount=Math.ceil(response.length/2);
      let pagecountarr=[];
      for(i=1;i<=pagecount;i++)
      {
          pagecountarr.push(i);
      }

      response.length!==0?res.status(200).json({moviesongs:filterpage,ismovieexist:true,pagecount:pagecount,pagecounts:pagecountarr}):res.status(200).json({moviesongs:filterpage,ismovieexist:false,pagecount:pagecount,pagecounts:pagecountarr})})

   .catch(err=>res.status(500).json({error:err}))
}

exports.findbymusicdirector=(req,res)=>{
   const request=req.body;

   const musicdirector=request.musicdirector;
   const language=request.language;
   const page=request.page ? request.page :1; //ternary operator
   const countperpage=2;
   let startindex=(page*countperpage)-countperpage;
 let endindex=(page*countperpage);

  
   songs.find({music:musicdirector,language:language})

   .then(response=>{
      
      const filterpage=response.slice(startindex,endindex);
      const pagecount=Math.ceil(response.length/2);
      let pagecountarr=[];
      for(i=1;i<=pagecount;i++)
      {
          pagecountarr.push(i);
      }
      
      response.length!==0?res.status(200).json({musicdirector:filterpage,isdirectorexist:true,pagecount:pagecount,pagecounts:pagecountarr}):res.status(200).json({musicdirector:filterpage,isdirectorexist:false,pagecount:pagecount,pagecounts:pagecountarr})})

   .catch(err=>res.status(500).json({error:err}))
}


exports.findbysingername=(req,res)=>{
   const request=req.body;

   const singername=request.singername;
   const language=request.language;
   const page=request.page ? request.page :1; //ternary operator
   const countperpage=2;
   let startindex=(page*countperpage)-countperpage;
 let endindex=(page*countperpage);


   songs.find({singers:singername,language:language})

   .then(response=>{
      
      const filterpage=response.slice(startindex,endindex);
      const pagecount=Math.ceil(response.length/2);
      let pagecountarr=[];
      for(i=1;i<=pagecount;i++)
      {
          pagecountarr.push(i);
      }
      
      response.length!==0?res.status(200).json({singernames:filterpage,issingerexist:true,pagecount:pagecount,pagecounts:pagecountarr}):res.status(200).json({singernames:filterpage,issingerexist:false,pagecount:pagecount,pagecounts:pagecountarr})})

   .catch(err=>res.status(500).json({error:err}))
}
