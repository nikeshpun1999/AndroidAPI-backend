const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    RecipeId: {
        type: String
    },
    UserId: {
        type: String
    }
})
module.exports = mongoose.model("wishlist", productSchema);