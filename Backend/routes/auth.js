const express=require('express')
const router=express.Router()

const {register,login,getalluser,getuser}=require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getalluser').get(getalluser)
router.route('/find/:userId').get(getuser)


module.exports=router;