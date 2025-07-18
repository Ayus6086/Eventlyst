const mongoose = require('mongoose');
async function connectDB(){
try{
    console.log("Establishing db connection...");
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB Connection Successful");
} catch(error){
    console.log(error);
    process.exit();
};
}

module.exports = connectDB;