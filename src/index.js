import cors from 'cors'
import mongoose from 'mongoose';
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();



import {userrouter} from './route/user.js'
import { recipesrouter } from './route/recipe.js';


const app=express();

app.use(express.json())
app.use(cors())
app.use("/auth",userrouter)
app.use("/recipes",recipesrouter)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.listen(process.env.PORT,()=>console.log("Server Started"))