const checkOtpData = (req, res, next)=>{
    const {email} = req.body;
    if(!email){
        res.status(400).json({
            status: 'failed',
            message: '\email\ is required'
        })
    }else{
        next();
    }
}

module.exports = checkOtpData;