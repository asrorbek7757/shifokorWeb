const { Router } = require('express')

const login = Router();

const { getUser, Login, createUser, deleteUser } = require('../controls/user')

login.get('/getUser', getUser);
login.post('/Login', Login);
login.post('/createUser', createUser);
login.delete('/deleteUser', deleteUser);



module.exports = login