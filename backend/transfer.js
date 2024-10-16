const connectMongoDB = require('./config/db_mongodb');
const transferData = require('./controllers/transferDataController');

const runTransfer = async () => {
    await connectMongoDB();
    await transferData();
    process.exit(0);
};

runTransfer();
