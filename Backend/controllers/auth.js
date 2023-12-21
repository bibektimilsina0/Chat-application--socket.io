const {BadRequestError,UnauthenticatedError} = require('../errors')
const User=require('../models/user')
const { StatusCodes } = require('http-status-codes')
const register=async(req,res)=>{
    console.log(req.body)
    const{password,confirmPassword}=req.body
    if(password!=confirmPassword){
        throw new BadRequestError("password and confirmPassword must be same")
    }
    const user= await User.create({...req.body})
    const token=user.createJWT()

 res.status(StatusCodes.CREATED).json({user:user.name,token:token});
}
const login=async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    if(!email||!password){
        throw new BadRequestError("please provide email and password")
    }
    const user= await User.findOne({email})
if(!user){
    throw new UnauthenticatedError('register first')
}
const isPasswordCorrect=user.comparePassword(password)
if(!isPasswordCorrect){
    throw new UnauthenticatedError('invalid credentials')
}
const token=user.createJWT();

res.status(StatusCodes.OK).json({user:{name:user.name,_id:user._id},token:token});
}

const getalluser=async(req,res)=>{
   const users=await User.find({});
   if(!users){
    throw new UnauthenticatedError('error while displaying all user list')
}
res.status(StatusCodes.OK).json(users)
}
const getuser=async(req,res)=>{
    const{userId}=req.params
    const user=await User.findOne({_id:userId})
    if(!user){
        throw new UnauthenticatedError('register first')
    }
    res.status(StatusCodes.OK).json(user)
}

module.exports={register,login,getalluser,getuser}