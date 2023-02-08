const User = require('../db/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { transporter, generateOtp } = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const { findByIdAndUpdate } = require('../db/userModel');
const saltRounds = 10;

exports.login = async (req, res) => {
    const {email , password} = req.body;
    try{
        let result = await User.findOne({email});
        const match = bcrypt.compareSync(password, result.password);
        if(!match){
            throw new Error("Password is not matching!");
        }
        const token = jwt.sign(
            {
                user_id : result.id
            }, process.env.ACCESS_TOKEN, { expiresIn: '1h' }
        );

        result = result.toObject();
        delete result.password;

        res.status(200).json({
            status : "success",
            token,
            body : {
                user : result
            }
        })
    }catch(error){
        res.status(404).json({
            status : "failed",
            message : error.message
        })
    }
}

exports.signup = async (req, res) => {
    const userObj = req.body;
    try{
        const hash = bcrypt.hashSync(userObj.password, saltRounds);
        userObj.password = hash;
        let newUser = await User.create(userObj);

        newUser = newUser.toObject();
        delete newUser.password;

        res.status(201).json({
            status : "success",
            body : {
                newUser
            }
        })

    }catch(error){
        res.status(403).json({
            status : "failed",
            message : error.message
        })
    }
}

exports.userDetails = async (req, res) => {
    const {user_id} = req.user;
    const {id} = req.query;
    try{
        let ID;
        if(id){
            ID = id;
        }else{
            ID = user_id;
        }
        const user = await User.findById(ID).select('-password -__v -otp');

        res.status(200).json({
            status : "success",
            body : {
                user
            }
        })

    }catch(error){
        res.status(404).json({
            status : "failed",
            message : error.message
        })
    }
}

exports.updateUser = async (req, res)=>{
    const {id} = req.query;
    const updateData = req.body;
    try{
        const user = await User.findByIdAndUpdate(id, updateData, {new: true})
            .select('-password -otp -__v');
        
        res.status(200).json({
            status : "success",
            body : {
                user
            }
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res)=>{
    const {id} = req.query;
    try{
        await User.findByIdAndDelete(id);

        res.status(202).json({
            status: 'success',
            message: 'user successfully deleted'
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.getAllUsers = async (req, res)=>{
    try{
        // const data = await User.find().select('-password -otp -__v');
        const features = new ApiFeatures(User.find(), req.query)
            .limitFields()
            .pagination();
        const data = await features.query;

        res.status(202).json({
            status: 'success',
            results: data.length,
            body: {
                data
            }
        })
    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.sendOtp = async (req, res) => {
    const {email} = req.body;
    
    try{
        let user = await User.findOne({email});
        
        const sixDigitOtp = generateOtp();
        
        user.otp = sixDigitOtp;
        await user.save();
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verification | TOTE',
            text: 'This is your reset password otp for tote application',
            html: '<b>'+ sixDigitOtp +'</b>'
        }
        await transporter.sendMail(mailOptions);

        res.status(202).json({
            status: 'success',
            message: 'Otp has been sent to your email.'
        })

    }catch(error){
        res.status(404).json({
            status : 'failed',
            message : error.message
        })
    }
}

exports.resetpassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    try{
        let user = await User.findOne({email});
        console.log(user);
        if(otp !== user.otp){
            throw new Error("Otp is not valid!");
        }
        const hash = bcrypt.hashSync(newPassword, saltRounds);
        user.password = hash;
        user.otp = '';
        await user.save();
        user = user.toObject();
        delete user.password

        res.status(201).json({
            status: 'success',
            message: 'Password has been changed successfully!',
            body: {
                user
            }
            
        })

    }catch(error){
        res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}