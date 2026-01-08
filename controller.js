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

    const addUser = (req,res,next) => {
    console.log('Request body:', req.body);
    const user = new users({
            id: req.body.id,
            name: req.body.name,
        });
        user.save()
        .then(response => {
            console.log('User saved:', response);
            res.json({
                message: 'User added successfully!',
                user: response
            })
        })
        .catch(error => {
            console.log('Error saving user:', error);
            res.json({
                message: 'An error occurred!',
                error: error.message
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
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById; 