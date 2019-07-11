const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    RecipeId:{
        type:String
    },
    UserId:{
        type:String
    },
    Like:{
        type:Number
    }
})
module.exports=mongoose.model("postlike",productSchema);