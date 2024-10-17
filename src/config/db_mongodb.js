const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/demo');
        console.log("Connected to MongoDB !")
    } catch(error) {
        console.error("Database connection error:", error);
        ProcessingInstruction.exit(1);
    }
};

module.exports = connectDB;