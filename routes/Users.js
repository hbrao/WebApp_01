express = require('express')
mongoose = require('mongoose')
bcrypt = require('bcryptjs')
passport = require('passport')

//Load users model
require('../models/User')
User = mongoose.model('users')

usersRouter = express.Router()

usersRouter.get('/login', (req, res) => {
    res.render('users/login')
})

usersRouter.get('/register', (req, res) => {
    res.render('users/register')
})

usersRouter.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are successfuly logged out')
    res.redirect('/users/login')
})

//Login form POST
usersRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Register form POST
usersRouter.post('/register', (req, res) => {
    let form_errors = [];
    if (req.body.password != req.body.password2) {
        form_errors.push({ text: "Passwords do not match !" })
    }
    if (req.body.password.length < 4) {
        form_errors.push({ text: "Passwords must be more than 4 charecters." })
    }
    if (form_errors.length > 0) {
        res.render('users/register', {
            errors: form_errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already registered !')
                    res.redirect('/users/login')
                } else {
                    newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            new User(newUser).save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can login')
                                    res.redirect('/users/login')
                                })
                                .catch(err => {
                                    console.log(err)
                                    return
                                })
                        })
                    })
                }
            })
            .catch(err => {
                form_errors.push({ text: "Unexpected error while looking up user." })
            })
    }
})

module.exports = usersRouter