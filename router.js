const express = require('express');
const router = express.Router();
const controllers = require('./controller');

router.get('/users', controllers.getUsers);

router.post('/createuser', controllers.addUser);

router.put('/updateuser', controllers.updateUser); 

router.delete('/deleteuser', controllers.deleteUser);

module.exports = router; 