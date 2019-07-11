const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const multer = require('multer');
// app.use(bodyParser.json());

const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static('images'));
app.use(bodyParser.json());
require('./DB/mongoose');

const userRoute = require('./Routes/user');
const recipeRoute = require('./Routes/recipe');
const postlikeRoute = require('./Routes/postlike');
const postcommentRoute = require('./Routes/postcomment');
const wishlistRoute = require('./Routes/wishlist');
const totalpostlikesRoute = require('./Routes/totalpostlikes');


app.use('/totalpostlikes', totalpostlikesRoute);
app.use('/wishlists', wishlistRoute);
app.use('/postcmts', postcommentRoute);
app.use('/posts', postlikeRoute);
app.use('/users', userRoute);
app.use('/recipes', recipeRoute);

module.exports = app;