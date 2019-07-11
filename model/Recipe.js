const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    RecipeName: {
        type: String
    },
    Origin: {
        type: String
    },
    Uid: {
        type: String
    },

    Raw1: {
        type: String
    },

    Raw2: {
        type: String
    },
    Raw3: {
        type: String
    },
    Raw4: {
        type: String
    },
    Raw5: {
        type: String
    },
    Raw6: {
        type: String
    },
    Raw7: {
        type: String
    },
    Raw8: {
        type: String
    },
    Raw9: {
        type: String
    },
    Direction: {
        type: String
    },
    Duration: {
        type: String
    },
    Servingcount: {
        type: String
    },
    Difficulty: {
        type: String
    },
    RecipeDesc: {
        type: String
    },
    RecipeImgName: {
        type: String
    }


});

module.exports = mongoose.model("Recipe", productSchema);