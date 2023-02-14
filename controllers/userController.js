const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const overwatch = require('overwatch-api');
const log = require('../logger/index');

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          return res.status(400).json({
            message: "No data",
            status: 400
          });
        }
        const user = await User.findOne({ email });
    
        if(user == null){
          return res.status(401).json({
            message: "Invalid email adress",
            status: 401
          })
        }
    
        const userToToken = {
          _id: user._id
        }
    
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(userToToken, process.env.TOKEN_KEY, { expiresIn: "2h" });

          overwatch.getProfile('pc', user.region, user.tagName, (err, doc) => {

            const username = user.tagName.split('-')
          
            return res.status(200).json({ message: "You are logged", status:200, data: {
              userInfo: {
                _id: user._id,
                notifications: user.notifications,
                friends: user.friends,
                messages: user.messages,
                posts: user.posts,
              },
              gameInfo: {
                name: username[0],
                lvl: doc.level,
                avatar: doc.portrait,
                frame: doc.levelFrame,
                star: doc.star,
              },
              token,
            } })
          })
        }else {
          return res.status(402).json({
            message: "Invalid password",
            status: 402
          });
        }
      } catch (err) {
        console.log(err)
        log.error('Internal server error! "POST /user/login"')
        return res.status(500).json({
          message: "Internal server error!",
          status: 500
        })
    
      }
}

exports.userRegister = async (req, res, next) => {
    try {
        const { tagName, region, email, password } = req.body;
    
        if (!(email && password && tagName && platform && region)) {
          return res.status(400).json({
            message: "Fill all data",
            status: 400
          });
        }
    
        await overwatch.getProfile('pc', region, tagName, async (err, json) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid Battle.net user', status: 401 } )
          } else {
            const oldUser = await User.findOne({ email, tagName });
    
            if (oldUser) {
              return res.status(402).json({
                message: "User with this email doesn't exist",
                ststus: 402
              })
            }
    
            encryptedPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({
              tagName,
              region,
              email: email.toLowerCase(),
              password: encryptedPassword,
            });
    
            const name = user.tagName.split('-')
    
            return res.status(201).json({
              message: `${name[0]} are registered`,
              status: 200
            });
          }
        });
      } catch (err) {
        log.error('Internal server error! "POST /user/register"')
        return res.status(500).json({
          message: "Internal server error!",
          status: 500
        })
      }
}