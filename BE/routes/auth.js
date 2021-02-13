const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const router = express.Router();
const Data = require('../models/Member');
var exp = process.env.JWT_EXP;
var token = '';
var secret = process.env.JWT_SECRET;

// SIGN UP
router.post('/signup', async (req, res) => {
    try {
        const check = await Data.find({
            email: req.body.email
        }, function (err, docs) {
            console.log(err);
        });
        if (check.length > 0) {
            res.json({
                status: false,
                message: "Email already registered"
            });
        } else {
            if (req.body.password === req.body.confirm_password) {
                const data = new Data({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt)
                });
                const user = await data.save();
                token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                }, secret, { expiresIn: exp });
                res.json({
                    "status": true,
                    "expiresIn": exp,
                    "type": "Bearer",
                    "token": token
                });
            } else {
                res.json({
                    status: false,
                    message: "Password did not match"
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Server Error"
        });
    }
});

// SIGN IN
router.post('/login', async (req, res) => {
    try {
        const data = await Data.findOne({
            email: req.body.email
        })
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (err) {
                res.json({
                    status: false,
                    message: error
                });
            } else {
                if (result) {
                    token = jwt.sign({
                        id: data._id,
                        email: data.email,
                        fullname: data.fullname,
                    }, secret, { expiresIn: exp });
                    res.json({
                        "status": true,
                        "expiresIn": exp,
                        "type": "Bearer",
                        "token": token
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Invalid Credentials"
                    });
                }
            }
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Server Error"
        });
    }
});

// VERIFY TOKEN
router.get('/user', async (req, res) => {
    try {
        token = req.headers['authorization'].split(' ')
        var result = jwt.verify(token[1], secret);
        const data = await Data.findOne({
            _id: result.id
        })
        res.json({
            status: true,
            message: "success",
            data: {
                id:data._id,
                email:data.email,
                fullname:data.fullname,
                createAt:data.createAt,
                updateAt:data.updateAt
            }
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
});

module.exports = router;