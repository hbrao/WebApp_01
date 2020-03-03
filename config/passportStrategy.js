LocalStrategy = require('passport-local').Strategy
mongoose = require('mongoose')
bcrypt = require('bcryptjs')

//Load user model
User = mongoose.model('users')

//Passport local strategy. 
module.exports = function (passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        console.log(email)
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    console.log('No User found !')
                    return done(null, false, { message: 'No User found !' })
                } else {
                    // Match password.
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user, { message: 'You are successfully logged in' })
                        } else {
                            console.log('Password Incorrect.')
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                }
            })
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

