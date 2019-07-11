const express = require("express");
const router = express.Router();
const totalpostlikes = require("../model/totalpostlikes");
const mongoose = require("mongoose");
const Auth = require('../Middleware/auth');
const path = require("path");

const multer = require("multer");
//const path=require("path");

//For user registration 


// router.post("/registeruser",(req,res)=>
// {
//     console.log(req.body);
//     var user= new User(req.body);
//     user.save();
//     res.json("success");
// })
router.post("/registertotallike", (req, res) => {
    const totalpost = new totalpostlikes(req.body);
    // totalpost.findOneAndDelete({ RecipeId: req.body.RecipeId }).
    totalpost.save()
        .then(result => {
            console.log(req);
            res.json(req.body);

        })

        .catch(err => {
            res.status(500).json({

                error: err,
                // console.log(error);
            })
        })
})




module.exports = router;