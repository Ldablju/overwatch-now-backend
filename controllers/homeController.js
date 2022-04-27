const log = require('../logger/index');

exports.getUserInfo = async (req, res, next) => {
  try{

    // in progress

  }catch(err){
    log.error('Internal server error! "GET /home"')
    return res.status(500).json({
      message: "Internal server error!",
      status: 500
    })
  }
}