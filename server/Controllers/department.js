const Department = require('../db/departmentModel');

exports.createDepartment = async (req, res) => {
   const departObj = req.body;
   try{
        const existingDepartment = await Department.find({title: departObj.title});
        if(existingDepartment.length !== 0){
            return res.status(409).json({
                status: 'failed',
                message: 'the department already exists.'
            })
        }
        await Department.create(departObj);

        res.status(201).json({
            status: 'success',
            message: "successfully created the department."
        })
   }catch(error){
        res.status(403).json({
            status: "failed",
            message: error.message
        })
   }
}

exports.getAllDepartments = async (req, res) => {
    try{
        const departments = await Department.find();

        res.status(200).json({
            status: 'success',
            response: departments
        })
    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    const {id} = req.query;
    try{
        await Department.findByIdAndDelete(id);

        res.status(202).json({
            status: "success",
            message: "successfully deleted department."
        })
    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.getDepartmentCount = async (_, res) => {
    try{
        const count = await Department.countDocuments();

        res.status(202).json({
            status: 'success',
            response: count
        })
    }catch(error){
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
};