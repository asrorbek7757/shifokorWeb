const express = require('express');
const cors = require('cors');

const { connect } = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());




async function connectToDB() {
    try {
        await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB is not connected", error);
    }
}

connectToDB();

app.get('/', (req, res) => {
    res.json("Hi NodeJs!");
});

// ----Routers--------
const  login = require('./routes/user');
const shifokor  = require('./routes/shifokor');


app.use('/user', login);
app.use('/shifokor', shifokor);



// ------PORT---------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} portda ishga tushdi`);
});
