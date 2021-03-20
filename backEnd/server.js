const express = require('express');
const connectDB = require('./config/dbConnect');
const user = require('./Routes/userRoute');

const app = express();
app.use(express.json());
connectDB();


app.use('/user',user);

const PORT = process.env.PORT || 5000;


app.listen(PORT , (err) => {
    err ? console.log(err) : console.log(`server is running on port ${PORT}`);
});

