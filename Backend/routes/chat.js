const express=require('express')
const router=express.Router()

const {findChat,createChat,findUserChats}=require('../controllers/chatcontroller')

router.route('/createchat').post(createChat)
router.route('/:userId').get(findUserChats)
router.route('/find/:firstUserId/:secondUserId').get(findChat)


module.exports=router;