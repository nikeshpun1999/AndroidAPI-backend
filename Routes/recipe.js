const express = require("express");
const router = express.Router();
const Recipe = require("../model/Recipe");
const mongoose = require("mongoose");
const Auth = require('../Middleware/auth');
const path = require("path");

const multer = require("multer");
var ImageNamee = '';

var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "recipe" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 1000000 } });

router.post('/craftrecipe', (req, res) => {
    console.log(req.file);
    console.log("Testin API");

    //var response = "Nothing";

    var RecipeName = req.body.RecipeName;
    var Origin = req.body.Origin;

    var Uid = req.body.Uid;
    var Raw1 = req.body.Raw1;
    var Raw2 = req.body.Raw2;
    var Raw3 = req.body.Raw3;
    var Raw4 = req.body.Raw4;
    var Raw5 = req.body.Raw5;
    var Raw6 = req.body.Raw6;
    var Raw7 = req.body.Raw7;
    var Raw8 = req.body.Raw8;
    var Raw9 = req.body.Raw9;
    var Direction = req.body.Direction;
    var Duration = req.body.Duration;
    var Servingcount = req.body.Servingcount;
    var Difficulty = req.body.Difficulty;
    var Recipedesc = req.body.Recipedesc;
    var ImageName = req.body.RecipeImgName;



    var newrecipe = new Recipe(
        {
            'RecipeName': RecipeName,
            'Origin': Origin,
            'Uid': Uid,
            'Raw1': Raw1,
            'Raw2': Raw2,
            'Raw3': Raw3,
            'Raw4': Raw4,
            'Raw5': Raw5,
            'Raw6': Raw6,
            'Raw7': Raw7,
            'Raw8': Raw8,
            'Raw9': Raw9,
            'Direction': Direction,
            'Duration': Duration,
            'Servingcount': Servingcount,
            'Difficulty': Difficulty,
            'RecipeDesc': Recipedesc,
            'RecipeImgName': ImageName

        }
    );
    console.log("REQUEST-->" + newrecipe);
    newrecipe.save().then(function () {
        response = "Recipe crafting successfull !!!"
        console.log(response);
        res.json(response);
    }).catch(function (e) {
        response = "Error"
        console.log(response);
        res.send(e);
    })

})

router.get("/", function (req, res) {
    Recipe.find()
        .sort({ _id: -1 }).limit(2)
        .exec()
        .then(function (recipe) {
            res.send(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.get("/populardishes", function (req, res) {
    Recipe.find()
        .sort({ _id: -1 }).limit(2)
        .exec()
        .then(function (recipe) {
            res.send(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.get("/alldishes", function (req, res) {
    Recipe.find()
        .sort({ _id: -1 })
        .exec()
        .then(function (recipe) {
            res.send(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.get('/getselectedrecipe/:id', function (req, res) {
    uid = req.params.id.toString();
    Recipe.findById(uid).then(function (recipe) {
        res.send(recipe);
    }).catch(function (e) {
        res.send(e)
    });
});



var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "recipe" + Date.now() + ext);
        // ImageNamee = "recipe" + Date.now() + ext;
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 1000000 } });

router.put('/updaterecipe', Auth, function (req, res) {
    const uid = req.user._id;
    console.log(req.body);

    Recipe.findByIdAndUpdate(uid, req.body, { new: true })
        .then(function (recipe) {
            res.send(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})


router.post('/uploadrecipeimg', upload.single('upload'), (req, res) => {
    res.json(req.file.filename);
    console.log(req.file.filename)
})


router.post('/postlike', (req, res) => {

    console.log("postlike entered");
    //var response = "Nothing";

    var RecipeId = req.body.RecipeId;

    var Uid = req.body.Uid;
    var like = req.body.like;


    var newpostlike = new postlike(
        {
            'RecipeId': RecipeId,

            'Uid': Uid,
            'Like': like
        }
    );
    console.log("REQUEST-->" + newrecipe);
    newpostlike.save().then(function () {
        response = "You liked the post !!!"
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Error"
        console.log(response);
        res.send(e);
    })

})

router.post("/recipesearch", function (req, res) {

    var raw1 = req.body.raw1;
    var raw2 = req.body.raw2;
    console.log(raw1, raw2);
    Recipe.find({
        $or: [{ 'Raw1': raw1 }, { 'Raw2': raw1 }, { 'Raw3': raw1 }, { 'Raw4': raw1 },
        { 'Raw5': raw1 }, { 'Raw6': raw1 }, { 'Raw7': raw1 }, { 'Raw8': raw1 },
        { 'Raw9': raw1 }, { 'Raw1': raw2 }, { 'Raw2': raw2 }, { 'Raw3': raw2 }, { 'Raw4': raw2 },
        { 'Raw5': raw2 }, { 'Raw6': raw2 }, { 'Raw7': raw2 }, { 'Raw8': raw2 },
        { 'Raw9': raw2 }]
    }).then(function (recipe) {
        console.log(recipe)
        res.json(recipe);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.get("/postedsearch", Auth, function (req, res) {
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaa")
    var UserId = req.user._id;
    console.log(UserId);
    Recipe.find({ 'Uid': UserId }).then(function (recipes) {
        console.log(recipes)
        res.json(recipes);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.delete('/delete/:id', function (req, res) {
    console.log(req.params.id)
    Recipe.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Removed from your recipe"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
})

router.post("/recipesearchwishlist", function (req, res) {

    console.log(req.body);
    Recipe.find(req.body).then(function (recipe) {
        console.log(recipe)
        res.json(recipe);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.post("/recipesearchwishlist/Android/:id", function (req, res) {
    uid = req.params.id;
    console.log(uid);
    Recipe.find(uid).then(function (recipe) {
        console.log(recipe)
        res.json(recipe);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})
router.post("/getyourrecipe/Android/:id", function (req, res) {

    uid = req.params.id;
    console.log(uid);
    Recipe.find({ 'Uid': uid }).then(function (recipes) {
        console.log(recipes)
        res.json(recipes);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.post("/totallikedata", function (req, res) {
    Recipe.find({ 'RecipeId': req.body.RecipeId })
        .sort({ Likes: -1 }).limit(2)
        .exec()
        .then(function (recipe) {
            res.json(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.get('/recipebyorigin', Auth, function (req, res) {
    const origin = req.user.Nationality;
    console.log(req.user.Nationality);

    Recipe.find({ 'Origin': origin })
        .then(function (recipe) {
            console.log(recipe)
            res.json(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.post('/recipebyorigin/Android/:nationality', function (req, res) {
    console.log("here")
    const nationality = req.params.nationality;
    console.log(nationality);

    Recipe.find({ 'Origin': nationality })
        .then(function (recipe) {
            console.log(recipe)
            res.json(recipe);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.get('/recipecount', Auth, (req, res) => {
    const userid = req.user._id;
    console.log(userid);
    console.log("postcount entered");
    Recipe.countDocuments({ 'Uid': userid }).then(function (recipecount) {
        console.log(recipecount);
        res.json({
            recipecount: recipecount
        });

    }).catch(function (e) {
        res.send(e)
    });




})

router.put('/updaterecipe/:id', function (req, res) {
    const rid = req.params.id;
    console.log("here")
    console.log(rid);
    console.log(req.body);

    Recipe.findByIdAndUpdate(rid, req.body, { new: true })
        .then(function (recipe) {
            res.json("updated");
        })
        .catch(function (e) {
            res.send(e);
        })
})


module.exports = router;