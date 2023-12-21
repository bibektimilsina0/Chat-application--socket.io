const chatmodel=require('../models/chatmodel')
const {BadRequestError} = require('../errors')
const createChat=async(req,res)=>{
    const {firstUserId,secondUserId}=req.body

    try{
        const chat=await chatmodel.findOne({
            members:{$all:[firstUserId,secondUserId]}
        })
        console.log(chat)
       
        if(chat) return res.status(200).json(chat)
        const newChat=new chatmodel({
    members:[firstUserId,secondUserId]})
    const response=await newChat.save()
    console.log(response)
   return res.status(200).json(response)
    }catch(error){
        
        throw new BadRequestError('error aayo')
    }
}
const findUserChats=async(req,res)=>{
    const userId=req.params.userId

    try{
        const chats=await chatmodel.findOne({
            members:{$in:[userId]}
        })
    
 return   res.status(200).json([chats])
    }catch(error){
        throw new BadRequestError(error)
    }
}
const findChat=async(req,res)=>{
    const {firstUserId,secondUserId}=req.params

    try{
        const chat=await chatmodel.findOne({
            members:{$all:(firstUserId,secondUserId)}
        })
        return res.status(200).json(chat)
       
    }catch(error){
        throw new BadRequestError(error)
    }
}
module.exports={createChat,findChat,findUserChats}