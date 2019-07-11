const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    RecipeId: {
        type: String
    },
    Likes: {
        type: Number
    }
})
module.exports = mongoose.model("totalpostlikes", productSchema);