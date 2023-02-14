const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');

const qs = require('query-string');


const BNET_ID = process.env.BNET_ID
const BNET_SECRET = process.env.BNET_SECRET

// Login with Battle.net
router.get('/auth', passport.authenticate('bnet'));
// Generate token with callback
router.get('/auth/callback', async (req, res, next) => {

    var token_params = qs.stringify({
        client_id: BNET_ID,
        client_secret: BNET_SECRET,
        code: req.query.code,
        scope: 'openid',
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/bnet/auth/callback'
    });

    request.post('https://eu.battle.net/oauth/token?' + token_params, function(error, response, body){
        if (error) {
            res.status(404)
        } else {
            const token = response.body
            res.status(200).json({
                token,
            })
        }
  
      });
});
// Validate token and return username
router.get('/auth/userinfo', async (req, res, next) => {

    try{

        const validate = JSON.parse(res.query.token)

        const options = {
            url: 'https://eu.battle.net/oauth/userinfo',
            headers: {
            'Authorization': 'Bearer ' + validate.access_token
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                userName = info.battletag.replace('#', '-')
                return res.status(200).json({
                    userName,
                })
            }
        }

        await request.get(options, callback)

    }
    catch(err){
        console.log(err)
    }
});

module.exports = router;
