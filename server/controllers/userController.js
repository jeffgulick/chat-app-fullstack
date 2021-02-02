const express = require('express');
const { User } = require('../data/models/userSchema');

const authUser = (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        username: req.user.username,
        image: req.user.image,
    });
};

const registerUser = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      
    newUser.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
}

const logInUser = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, user not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
}

const logOutUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
}

module.exports = { authUser, registerUser, logInUser, logOutUser }