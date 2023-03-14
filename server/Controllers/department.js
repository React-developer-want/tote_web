const Department = require('../db/departmentModel');

exports.createDepartment = async (req, res) => {
   const departObj = req.body;
   try{
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