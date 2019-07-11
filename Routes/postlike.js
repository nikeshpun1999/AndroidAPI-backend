const express = require("express");
const router = express.Router();
const postlike = require("../model/postlike");
const mongoose = require("mongoose");
const Auth = require('../Middleware/auth');
const path = require("path");


router.post('/postlike', (req, res) => {

    console.log("postlike entered");
    //var response = "Nothing";

    var RecipeId = req.body.RecipeId;

    var UserId = req.body.UserId;



    var newpostlike = new postlike(
        {
            'RecipeId': RecipeId,

            'UserId': UserId,
            'Like': '1'
        }
    );
    console.log("REQUEST-->" + newpostlike);
    postlike.findOneAndRemove({ 'RecipeId': RecipeId, 'UserId': UserId }).then(function () {
        console.log("unlike deleted like stored");
        res.send();
    }).catch(function () {

    })
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

router.post('/postunlike', (req, res) => {

    console.log("postunlike entered");
    //var response = "Nothing";

    var RecipeId = req.body.RecipeId;

    var UserId = req.body.UserId;



    var newpostunlike = new postlike(
        {
            'RecipeId': RecipeId,

            'UserId': UserId,
            'Like': '0'
        }
    );
    console.log("REQUEST-->" + newpostunlike);
    postlike.findOneAndRemove({ 'RecipeId': RecipeId, 'UserId': UserId }).then(function () {
        console.log("like deleted unlike stored");
        res.send();
    }).catch(function () {

    })
    newpostunlike.save().then(function () {
        response = "You unliked the post !"
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Error"
        console.log(response);
        res.send(e);
    })

})


router.get('/likecount/:id', (req, res) => {
    Rid = req.params.id.toString();
    console.log(Rid);
    console.log("postcount entered");
    postlike.countDocuments({ 'RecipeId': Rid, Like: '1' }).then(function (likecount) {
        console.log(likecount);
        res.json({
            Like: likecount
        });

    }).catch(function (e) {
        res.send(e)
    });




})
router.get('/likecount', (req, res) => {

    console.log("postcount entered");
    postlike.countDocuments({ Like: '1' }).then(function (likecount) {
        console.log(likecount);
        res.json({
            Like: likecount
        });

    }).catch(function (e) {
        res.send(e)
    });




})

router.post('/dishlikecount', (req, res) => {
    console.log("andhere")
    console.log(req.body);
    postlike.countDocuments(req.body).then(function (likecount) {
        console.log("heree")
        console.log(likecount);
        res.json({
            RecipeId: req.body.RecipeId,
            Likes: likecount
        });

    }).catch(function (e) {
        res.send(e)
    });




})



module.exports = router;