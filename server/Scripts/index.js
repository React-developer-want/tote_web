const mongoose = require('mongoose');
const departmentsData = require('./departments.json');

const departSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A department should have a title."]
    },
    url: {
        type: String
    }
});

const Department = mongoose.model('departments', departSchema);

const createDeparments = async () => {
    const response = await Department.insertMany(departmentsData);
    console.log("result", response);
}

const getAllDepartments = async () => {
    const response = await Department.find();
    console.log("length", response);
}

const db = '';
const password = '';
const dblink = db.replace(
    '<PASSWORD>',
    password
);

mongoose.connect(dblink).then(()=>{
    console.log("DB succesfully connected!");
    createDeparments().then(()=>{
        console.log("data inserted succesfully");
    }) 
}).catch((error)=>{
    console.log("Error in db", error.message);
})