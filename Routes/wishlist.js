const express = require("express");
const router = express.Router();
const wishlist = require("../model/wishlist");
const mongoose = require("mongoose");
const Auth = require('../Middleware/auth');
const path = require("path");


router.post('/addtowishlist', (req, res) => {

    console.log("wishlist entered");
    //var response = "Nothing";

    var RecipeId = req.body.RecipeId;

    var UserId = req.body.UserId;



    var wishes = new wishlist(
        {
            'RecipeId': RecipeId,

            'UserId': UserId,
        }
    );

    wishes.save().then(function () {
        response = "You saved the post to wishlist!!!"
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Error"
        console.log(response);
        res.send(e);
    })

})

router.get("/wishlistsearch", Auth, function (req, res) {
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaa")
    var UserId = req.user._id;
    console.log(UserId);
    wishlist.find({ 'UserId': UserId }).then(function (wishlists) {
        console.log(wishlists)
        res.json(wishlists);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.post("/getyourrecipe/Android/:UserId", function (req, res) {

    uid = req.params.UserId;
    console.log(uid);
    wishlist.find({ 'UserId': uid }).then(function (wishlist) {
        console.log(wishlist)
        res.json(wishlist);
    }).catch(function (e) {
        res.send(e)
    });
    // res.send({token});


})

router.delete('/delete/:id', function (req, res) {
    console.log(req.params.id)
    wishlist.findOneAndDelete({ RecipeId: req.params.id })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Removed from your wishlist"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
})

router.get('/wishcount', Auth, (req, res) => {
    const userid = req.user._id;
    console.log(userid);
    console.log("postcount entered");
    wishlist.countDocuments({ 'UserId': userid }).then(function (wishcount) {
        console.log(wishcount);
        res.json({
            wishcount: wishcount
        });

    }).catch(function (e) {
        res.send(e)
    });
})




module.exports = router;