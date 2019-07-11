const express = require("express");
const router = express.Router();
const User = require("../model/User");
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
router.post("/registeruser", (req, res) => {
    const user = new User({
        Fname: req.body.firstname,
        Mname: req.body.middlename,
        Lname: req.body.lastname,
        Username: req.body.uname,
        Password: req.body.password,
        UserDesc: req.body.userdescription,
        ProfilePic: "default.jpg",
        Age: req.body.age,
        Sex: req.body.sex,
        Nationality: req.body.nationality
    });
    user
        .save()
        .then(result => {
            console.log(req);
            res.status(201).json("User Registered successfully"

            )
        })
        .catch(err => {
            res.status(500).json({

                error: err,
                // console.log(error);
            })
        })
})

router.post("/Login", async function (req, res) {

    var enteredUname = req.body.username;
    var enteredpass = req.body.password;
    console.log(enteredUname, enteredpass);
    const user = await User.checkCredentialsDb(enteredUname, enteredpass);
    if (user) {
        const token = await user.generateAuthToken();
        res.status(201).json({
            token: token,
            user: user,
            id: user._id,
            fname: user.Fname,
            mname: user.Mname,
            lname: user.Lname,
            username: user.Username,
            password: user.Password,
            userdesc: user.UserDesc,
            profilepic: user.ProfilePic,
            age: user.Age,
            sex: user.Sex,
            nationality: user.Nationality

        });
    }
    else {
        res.json({ message: "Invalid" });
    }
    // res.send({token});


})

router.get('/this', Auth, function (req, res) {
    res.send(req.user);
    console.log(req.user);
})

var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "profile" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 1000000 } });

router.post('/updateprofile', Auth, function (req, res) {
    const uid = req.user.id;
    console.log(req.body);

    User.findByIdAndUpdate(uid, req.body, { new: true })
        .then(function (user) {
            res.json(user);
        })
        .catch(function (e) {
            res.send(e);
        })
})

router.post('/updateprofile/Android/:id', function (req, res) {
    console.log("here")
    const uid = req.params.id;
    console.log(req.body);

    User.update({ _id: uid }, { $set: req.body }, { new: true })
        .then(function (user) {
            res.json(user);
        })
        .catch(function (e) {
            res.send(e);
        })
})



router.post('/uploadimg', upload.single('upload'), (req, res) => {
    // res.json({ Filename: req.file.filename });
    res.json(req.file.filename);
    console.log(req.file.filename)
})

router.get('/getuserdata/:id', function (req, res) {
    uid = req.params.id.toString();
    User.findById(uid).then(function (user) {
        res.json(user);
    }).catch(function (e) {
        res.send(e)
    });
});

router.post('/logout', Auth, async (req, res) => {
    try {

        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()

    }
})


module.exports = router;