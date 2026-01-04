const { response } = require('./App');
const users = require('./model');

const getUsers = (req,res,next) => {

    users.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred!'
        })
    });
};

    const adddUser = (req,res,next) => {
    const user = new users({
            id: req.body.id,
            name: req.body.name,
        });
        user.save()
        .then(response => {
            res.json({
                message: 'User added successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        });
    };

        const updateUser = (req,res,next) => {
        const id = req.body.id;
        const name = req.body.name;

        users.findOneAndUpdate({ id: id }, { $set: { name: name } })
    
        .then(response => {
            res.json({
                message: 'User updated successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        });
    };

    const getUserById = (req,res,next) => {
    const id = req.body.id;
    users.findById(id)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred!'
        })
    });
};
        const deleteUser = (req,res,next) => {
        const id = req.body.id;
        users.deleteOne({id : id})
        .then(response => {
            res.json({
                message: 'User deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        });
    };

exports.getUsers = getUsers;
exports.addUser = adddUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById; 