const { Router } = require('express')

const shifokor = Router();

const {getShifokor , createShifokor,deleteShifokor ,updateShifokor  } = require('../controls/shifokor')

shifokor.get('/getShifokor', getShifokor);
shifokor.post('/createShifokor', createShifokor);
shifokor.put('/updateShifokor/:_id', updateShifokor);
shifokor.delete('/deleteShifokor/:_id', deleteShifokor);



module.exports =  shifokor 