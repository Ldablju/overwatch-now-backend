const ObjectID = require("mongoose").Types.ObjectId;
const log = require('../logger');
const User = require('../models/user');

exports.getFriendsList = async (req, res, next) => {
    try{
        const profile = await User.findOne({ _id: req.user._id })
        const friends = profile.friends

        async function getFriendsList(table){
            const tabela = [];
            for(let i=0;i<table.length;i++){
                const data = await User.findOne({ _id: ObjectID(table[i])}).select("_id posts")
                tabela.push(data)
            }
            return tabela
        }
        const friendList = await getFriendsList(friends)
        return res.status(200).json({
            message: `Your friends list`,
            status: 200,
            data: friendList
        })
    }
    catch(err){
        log.error('Internal server error! "GET /friends/list"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.sendInvite = async (req, res, next) => {
    try{
        const profile = await User.findOne({ _id: req.user._id })
        const profileSend = await User.findOne({ _id: req.params.profileId })
        if(profile.friends.includes(req.params.profileId)){
            return res.status(401).json({
                message: "This user is already in your friends list",
                status: 401
            })
        }
        const result = profileSend.notifications.find( ({ author }) => author === req.user._id );
        if(result != null){
            return res.status(402).json({
                message: "Your request is already sented",
                status: 402
            })
        }
        const notification = {
            _id: new ObjectID(),
            author: req.user._id,
            name: `${profile.tagName} was invited to friends`,
        }

        const sendInvite = await User.findOneAndUpdate({ _id: req.params.profileId }, { $push: { notifications: notification } })
        if(sendInvite == null){
            return res.status(401).json({
                message: "User doesn't exist",
                status: 402
            })
        }
        return res.status(200).json({
            message: `Request is sent`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "GET /friends/invite/:user_id"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }  
}

exports.acceptInvite = async (req, res, next) => {
    try{
        const query = {
            _id: req.user._id,
            "notifications._id": {
                $eq: ObjectID(req.params.inviteId)
            }
        }
        const profiles = await User.findOne(query)

        if(profiles == null){
            return res.status(401).json({
                message: "Invite doesn't exist",
                status: 401
            })
        }


        function getFriendId(table){
            var id;
            for(let i=0; i<table.length; i++){
                if(table[i]._id == req.params.inviteId){
                    id = table[i].author
                }
            }
            return id;
        }

        const id = getFriendId(profiles.notifications)

        await User.findOneAndUpdate({_id: req.user._id}, { $push: { friends: id } })

        await User.findOneAndUpdate({_id: id}, { $push: { friends: req.user._id } })

        const update = { $pull: { notifications: { _id: ObjectID(req.params.inviteId) } } }

        await User.update(query, update)

        return res.status(200).json({
            message: `User has been added to your friends list`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "GET /friends/invite/accept/:invite_id"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }  
}

exports.removeInvite = async (req, res, next) => {
    try{
        const query = {
            _id: req.user._id,
            "notifications._id": {
                $eq: ObjectID(req.params.inviteId)
            }
        }
        const update = { $pull: { notifications: { _id: ObjectID(req.params.inviteId) } } }

        const usun = await User.update(query, update)

        if(usun.modifiedCount === 0){
            return res.status(401).json({
                message: "Invite doesn't exist",
                status: 401
            })
        }

        return res.status(200).json({
            message: `Invite was deleted`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "GET /friends/invite/accept/:invite_id"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }  
}