const express=require('express')
const router=express.Router()

const {getMessage,createMessage}=require('../controllers/messageController')

router.route('/createmessage').post(createMessage)
router.route('/:chatId').get(getMessage)



module.exports=router;