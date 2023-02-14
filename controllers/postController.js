const ObjectID = require("mongoose").Types.ObjectId;
const log = require('../logger/index');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPostController = async (req, res, next) => {
    try{
        const post = await Post.find()
        return res.status(200).json({
            message: "Posts list",
            status: 200,
            data: {
                count: post.length,
                posts: post
            }
        })
    }
    catch(err){
        log.error('Internal server error! "GET /post"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.getSinglePost = async (req, res, next) => {
    try{
        const post = await Post.findOne({_id: req.params.post_id})
        if(post == null){
            return res.status(401).json({
                message: "Post doesn't exist",
                status: 401
            })
        }
        return res.status(200).json({
            message: "Finded post",
            status: 200,
            post
        })
    }
    catch(err){
        log.error('Internal server error! "GET /post/:post"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { name, desc } = req.body;

        if(!(name && desc)){
            return res.status(401).json({
                message: "Fill data",
                status: 401
            })
        }

        if(req.file == undefined){
            return res.status(402).json({
                message: "You must send mp4 file",
                stauts: 402
            })
        }

        const post = await Post.create({
            name,
            desc,
            author: req.user,
            video: req.file.filename
        })
        await User.findOneAndUpdate({ _id: req.user._id }, { $push: { posts: { _id: post._id} } })
        return res.status(200).json({
            message: `Post '${post._id} has been added'`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "POST /post/add"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.likePost = async (req, res, next) => {
    try{
        const findLike = await Post.findOne({ _id: req.params.post_id })
        if(findLike.like.includes(req.user._id)){
            return res.status(401).json({
                message: "Second like is doesn't available",
                status: 401
            })
        }
        await Post.findOneAndUpdate({ _id: req.params.post_id }, { $push: { like: req.user._id } })
        return res.status(200).json({
            message: `Liked post ${req.params.post_id}`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "GET /post/like/:post"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.commentPost = async (req, res, next) => {
    try {
        const { desc } = req.body;
        if(!desc){
            return res.status(401).json({
                message: "Comment is empty",
                status: 401
            })
        }
        const commentPost = await Post.findOneAndUpdate({ _id: req.params.post_id }, { $push: { comments: { author: req.user._id, desc, date: Date.now().toLocaleString(), } } })
        if(commentPost == null){
            return res.status(402).json({
                message: "Post doesn't exist",
                status: 402
            })
        }
        return res.status(200).json({
            message: `Comment has been added`,
            status: 200
        })
    }
    catch(err){
        log.error('Internal server error! "GET /post/comment/:post"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}

exports.removePost = async (req, res, next) => {
    try{
        const postId = req.params.post_id
        await User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { posts: { _id: ObjectID(postId) }}} )
        const removePost = await Post.deleteOne({ _id: postId, author: req.user._id })
        if(removePost.deletedCount < 1){
            return res.status(401).json({
                message: "Post not found or you are not author"
            })
        }
        return res.status(200).json({
            message: `Post ${postId} has been deleted`
        })
    }
    catch(err){
        log.error('Internal server error! "GET /post/delete/:post"')
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}