require("dotenv").config();
require("./config/database").connection();
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const log = require('./logger/index');

const BnetStrategy = require('passport-bnet').Strategy;
const BNET_ID = process.env.BNET_ID
const BNET_SECRET = process.env.BNET_SECRET
const passport = require('passport')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user/index');
const postRouter = require('./routes/post/index');
const friendRouter = require('./routes/friend/index');
const messageRouter = require('./routes/message/index');

const bnetRouter = require('./routes/bnet/index');

const app = express();

passport.use(new BnetStrategy({
  clientID: BNET_ID,
  clientSecret: BNET_SECRET,
  callbackURL: "http://localhost:3000/bnet/auth/callback",
  region: "eu"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '.mp4')
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'video/mp4'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage, fileFilter, }).single('post'))

app.use('/home', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/friends', friendRouter);
app.use('/message', messageRouter);


app.use('/bnet', bnetRouter);

app.use(function(req, res, next) {
  res.status(404).json({
    message: `Route doesn't exist!`,
    status: 404
  });
  log.error(`Route doesn't exist ${req.url}!`)
});

module.exports = app;
