import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import { usermodel } from "../model/User.js"

const router=express.Router()

router.post("/register",async(req,res)=>{
    const{username,password}=req.body;
    const user=await usermodel.findOne({username:username})
    if(user){
        return res.json({message:"User Already exists!"})
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const newuser=new usermodel({username:username,password:hashedpassword})
    await newuser.save();
    res.json({message:"User Registered!"})
})

router.post("/login",async(req,res)=>{
    const{username,password}=req.body;
    const user=await usermodel.findOne({username:username})
    if(!user){
        return res.json({message:"User Doesn't Exist!"})
    }
    const validpas=await bcrypt.compare(password,user.password)
    if(!validpas){
        return res.json({message:"Username or Password incorrect"})
    }
    const token=jwt.sign({id:user._id},"secret")
    res.json({token,userId:user._id});
})


export {router as userrouter}

export const verifyToken=(req,res,next)=>{
    const token=req.headers.auth;
    if(token){
        jwt.verify(token,"secret",(err)=>{
            if(err) return res.sendStatus(403)
            next();
        })
        
    }
    else{
        res.sendStatus(401)
    }
}