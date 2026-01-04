const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const controllers = require('./controller');


app.use(cors());

//app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/users', (req, res) => {
   // var resObj=[];
    controllers.getUsers(req, res, next => {
        res.send();
    });
});

app.post('/createuser', (req, res) => {
    controllers.addUser(req.body, (callack) => {
        res.send(user);
    });
});

app.post('/updateuser', (req, res) => {
    controllers.updateUser(req.body, (callack) => {
        res.send(callack);
    });
});

app.post('/deleteuser', (req, res) => {
    controllers.deleteUser(req.body, (callack) => {
        res.send(callack);
    });
});

module.exports = app;

