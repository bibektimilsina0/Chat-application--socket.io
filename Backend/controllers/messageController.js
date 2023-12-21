const chatmodel=require('../models/chatmodel')
const {BadRequestError} = require('../errors')
const messagemodel = require('../models/messagemodel')

const createMessage=async(req,res)=>{
    const{chatId,senderId,text}=req.body
    const message=new messagemodel({
        chatId,senderId,text
    })
    try{
        const response=await message.save()
        res.status(200).json(response)
    }catch(error){
        res.status(500).json(error)
    }
   
}

const getMessage=async(req,res)=>{
    const{chatId}=req.params
    try{
      const message=await messagemodel.find({chatId})
        res.status(200).json(message)
    }catch(error){
        res.status(500).json(error)
    }
}
module.exports={createMessage,getMessage}