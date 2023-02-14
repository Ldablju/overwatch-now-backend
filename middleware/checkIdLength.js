const checkIdLength = (req, res, next) => {
    const { inviteId, post_id, profileId } = req.params;
    if(!inviteId && !profileId){
        if(post_id.length != 24){
            return res.status(405).json({
                message: "Nie znaleziono takiego posta!",
                status: 405
            })
        }

    }
    if(!inviteId && !post_id){
        if(profileId.length != 24){
            return res.status(405).json({
                message: "Nie znaleziono takiego profilu!",
                status: 405
            })
        }
    }
    if(!profileId && !post_id){
        if(inviteId.length != 24){
            return res.status(405).json({
                message: "Nie znaleziono takiego zaproszenia!",
                status: 405
            })
        }
    }
    next()
}

module.exports = checkIdLength;