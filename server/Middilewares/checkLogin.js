const checkLoginData = (req, res, next)=>{
    const {email, password} = req.body;
    if(!email){
        res.status(400).json({
            status: 'failed',
            message: "\email\ is required"
        })
    }else if(!password){
        res.status(400).json({
            status: 'failed',
            message: '\password\ is required'
        })
    }else{
        next();
    }
}

module.exports = checkLoginData;