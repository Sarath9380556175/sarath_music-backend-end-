const express=require('express');

const router=express.Router();

const signupcontroller=require('../controllers/signup');

const forgotcontroller=require('../controllers/forgot');

const musiccontroller=require('../controllers/music');

const admincontroller=require('../controllers/admin')

const imagecontroller=require('../controllers/image')

router.post('/signup',signupcontroller.postsignup);

router.post('/signupcheck', signupcontroller.checksignup)

router.post('/login',signupcontroller.login)

router.post('/updatepassword',signupcontroller.updatepassword)

router.post('/forgot',forgotcontroller.forgotpassword)

router.post('/isotpvalid',forgotcontroller.isotpvalid)

router.post('/deleteotp',forgotcontroller.deleteotp)

router.post('/findmusicbylanguage',musiccontroller.getsongsbylanguage)

router.post('/findbysongname',musiccontroller.getsongsbyname)

router.post('/mails',signupcontroller.getmails)

router.post('/notifications',signupcontroller.sendnotifications)

router.post('/admin',admincontroller.postadminpassword)

router.post('/songsrequest',admincontroller.postyoursongs)

router.post('/songsrequestedmails',admincontroller.get_all_customer_emails)

router.post('/requestedsongnotification',admincontroller.requestedsongsnotifications)

router.post('/images', imagecontroller.postimages)

router.post('/findbymoviename',musiccontroller.findbymoviename)




module.exports=router;
