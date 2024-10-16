const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ADRESS);
        console.log("Connected to MongoDB !")
    } catch(error) {
        console.error("Database connection error:", error);
        ProcessingInstruction.exit(1);
    }
};

module.exports = connectDB;