import mongoose from 'mongoose';

const recipeschema=new mongoose.Schema({
    name:{type:String,required:true},
    ingredines:[{type:String,required:true}],
    instruction:{type:String,required:true},
    imageurl:{type:String,required:true},
    cookingtime:{type:Number,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
})

export const recipemodel=mongoose.model("recipe",recipeschema)