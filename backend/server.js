const express = require('express');
const connectDB = require('./config/db_mongodb');
const eventRoute = require('./routes/eventRoutes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');

connectDB();

app.use('/api',eventRoute);
app.use(express.static('views'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));