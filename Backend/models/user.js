const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide full name"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,"provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Provide valid email'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'provide password'],
        minlength:5
    },
   confirmPassword:{
        type:String,
        required:[true,'please confirm password'],
        minlength:5
    },
    userName:{
        type:String,
        required:[true,"provide unique userName"],
    }

})
UserSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    const salt=await bcrypt.genSalt(10);
   this.confirmPassword= this.password=await bcrypt.hash(this.password,salt)

})
UserSchema.methods.createJWT=function(){
   return jwt.sign(
    {userID:this._id,userNm:this.userName},
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_LIFETIME,
    }
   )
}
UserSchema.methods.comparePassword=async function(passwordEntered){
const isMatch=await bcrypt.compare(passwordEntered,this.password)
return isMatch;
}
module.exports=mongoose.model('User',UserSchema)