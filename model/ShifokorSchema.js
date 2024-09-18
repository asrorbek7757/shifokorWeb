const { Schema, model } = require('mongoose');

const ShifokorSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: {type: String, required: true},
    password: {type: String, required: true}
});

const Shifokor = model('shifokor', ShifokorSchema);
module.exports = Shifokor;
