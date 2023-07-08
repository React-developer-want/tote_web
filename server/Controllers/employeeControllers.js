const Employee = require('../db/employeeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { transporter, generateOtp } = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const { sendOTPTemplate } = require('../html-template/send-otp-template');
const saltRounds = 10;

exports.login = async (req, res) => {
    const {email , password} = req.body;
    try{
        let result = await Employee.findOne({email});
        const match = bcrypt.compareSync(password, result.password);
        if(!match){
            throw new Error("Password is not matching!");
        }
        const token = jwt.sign(
            {
                employee_id : result.id
            }, process.env.ACCESS_TOKEN, { expiresIn: '1h' }
        );

        const tokenDetails = {
            token,
        };

        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN, {
                "alg": "HS256",
                "typ": "JWT"
            });
            tokenDetails.expiry = decode.exp;
        } catch (err) {
            console.log(err);
        }

        result = result.toObject();
        delete result.password;

        res.status(200).json({
            status : "success",
            tokenDetails, 
            body : {
                employee : result
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
    const employeeObj = req.body;
    try{
        const hash = bcrypt.hashSync(employeeObj.password, saltRounds);
        employeeObj.password = hash;
        let newEmployee = await Employee.create(employeeObj);

        newEmployee = newEmployee.toObject();
        delete newEmployee.password;

        res.status(201).json({
            status : "success",
            body : {
                newEmployee
            }
        })

    }catch(error){
        res.status(403).json({
            status : "failed",
            message : error.message
        })
    }
}

exports.employeeDetails = async (req, res) => {
    const {employee_id} = req.employee;
    const {id} = req.query;
    try{
        let ID;
        if(id){
            ID = id;
        }else{
            ID = employee_id;
        }
        const employee = await Employee.findById(ID).select('-password -__v -otp');

        res.status(200).json({
            status : "success",
            body : {
                employee
            }
        })

    }catch(error){
        res.status(404).json({
            status : "failed",
            message : error.message
        })
    }
}

exports.updateEmployee = async (req, res)=>{
    const {id} = req.query;
    const updateData = req.body;
    try{
        const employee = await Employee.findByIdAndUpdate(id, updateData, {new: true})
            .select('-password -otp -__v');
        
        res.status(200).json({
            status : "success",
            body : {
                employee
            }
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.deleteEmployee = async (req, res)=>{
    const {id} = req.query;
    try{
        await Employee.findByIdAndDelete(id);

        res.status(202).json({
            status: 'success',
            message: 'employee successfully deleted'
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.getAllEmployees = async (req, res)=>{
    try{
        // const data = await Employee.find().select('-password -otp -__v');
        const features = new ApiFeatures(Employee.find(), req.query)
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

exports.getEmployeesCount = async (_, res) => {
    try {
        const count = await Employee.countDocuments();
        
        res.status(200).json({
            status: 'success',
            response: count
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.resetPasswordSendOTP = async (req, res) => {
    const {email} = req.body;
    
    try{
        let employee = await Employee.findOne({email});
        
        const sixDigitOtp = generateOtp();
        
        employee.otp = sixDigitOtp;
        await employee.save();
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verification | TOTE',
            text: 'This is your reset password otp for tote application',
            html: sendOTPTemplate(sixDigitOtp)
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

exports.resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    try{
        let employee = await Employee.findOne({email});
        if(otp !== employee.otp){
            throw new Error("Otp is not valid!");
        }
        const hash = bcrypt.hashSync(newPassword, saltRounds);
        employee.password = hash;
        employee.otp = '';
        await employee.save();
        employee = employee.toObject();
        delete employee.password

        res.status(201).json({
            status: 'success',
            message: 'Password has been changed successfully!',
            body: {
                employee
            }
            
        })

    }catch(error){
        res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}