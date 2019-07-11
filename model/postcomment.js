const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    RecipeId: {
        type: String
    },
    UserId: Schema.Types.ObjectId,
    Comment: {
        type: String
    },
    Rate: {
        type: Number
    }
})
module.exports = mongoose.model("postcomment", productSchema);