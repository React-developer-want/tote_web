const mongoose = require('mongoose');

const db = process.env.DB_CLOUD_LINK.replace(
    '<PASSWORD>', 
    process.env.DB_PASSWORD
);

mongoose.connect(db).then(()=>{
    console.log("DB succesfully connected!");
}).catch((error)=>{
    console.log("Error in db", error.message);
})