import  express  from "express";
import { recipemodel } from "../model/Recipe.js";
import { usermodel } from "../model/User.js";
import { verifyToken } from "./user.js";

const router=express.Router();

router.get("/",async(req,res)=>{
    try {
        const response=await recipemodel.find({})
        res.json(response);
    } catch (error) {
        res.json(error)
    }
})


router.post("/",verifyToken,async(req,res)=>{
    const recipe=new recipemodel(req.body)
    try {
        const response=await recipe.save()
        res.json(response);
    } catch (error) {
        res.json(error)
    }
})


router.put("/",verifyToken,async(req,res)=>{
   
    try {
        const recipe=await recipemodel.findById(req.body.recipeID)
        const user=await usermodel.findById(req.body.userID)
        user.savedRecipe.push(recipe)
        await user.save()
        res.json({savedRecipe:user.savedRecipe});
    } catch (error) {
        res.json(error)
    }
})

router.get("/savedRecipe/ids/:userID",async(req,res)=>{
    try {
        const user=await usermodel.findById(req.params.userID)
        res.json({savedRecipe:user?.savedRecipe})
    } catch (error) {
        res.json(error)
    }
})
router.get("/savedRecipe/:userID",async(req,res)=>{
    try {
        const user=await usermodel.findById(req.params.userID)
        const savedRecipe=await recipemodel.find({_id:{$in:user.savedRecipe}})
        res.json({savedRecipe})
    } catch (error) {
        res.json(error)
    }
})



export {router as recipesrouter}