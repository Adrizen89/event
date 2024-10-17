const importData =require('./services/dataMongoService');


const connectMongoDB = require('./config/db_mongodb');
const { transferData } = require('./controllers/dataCentralController');

const runTransfer = async () => {
    await connectMongoDB();
    await transferData();
    process.exit(0);
};

const runPrograms = async () => {
    await importData();
    await runTransfer();
    process.exit(1);
}

runPrograms();