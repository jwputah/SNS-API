const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-_v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-_v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
            })
            .then(() => {
                res.json({ message: 'User has been deleted.' });
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId }},
            { new: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no user found with this id." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    }
}


module.exports = userController;