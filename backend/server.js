const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const eventRoute = require('./routes/eventRoutes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.json());

connectDB();

app.use('/api',eventRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));