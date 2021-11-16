const images=require('../models/image')

exports.postimages=(req,res)=>{

    images.find()

    .then(response=>res.status(200).json({images:response}))

    .catch(err=>res.status(500).json({error:err}))

}