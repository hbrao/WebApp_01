LocalStrategy = require('passport-local').Strategy
mongoose = require('mongoose')
bcrypt = require('bcryptjs')

//Load user model
User = mongoose.model('users')

//Passport local strategy. 
module.exports = function (passport) {

    //usernameField refers to the name of input fields in login form i.e. views/users/login.handlebars
    passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
        console.log("Executing passport authentication for user " + username)
        User.findOne({ email: username }) // Step 1: Find user in database.
            .then(user => {
                if ( ! user ) {
                    console.log('No User found in database !')
                    return done(null, false, { message: 'No User found !' })
                } else {
                    // Step 2: Check password.
                    console.log('Username found.')
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if ( err ) throw err
                        if ( isMatch ) {
                            console.log('Password verified.')
                            //Step 3: Invoke done with user object. Passport will ensure user object is available in req object. 
                            return done(null, user, { message: 'You are successfully logged in' })
                        } else {
                            console.log('Incorrect password was provided !')
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

