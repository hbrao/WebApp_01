//Used in protected routes (e.g. routes/Idea.js) to ensure only authenticated users can access them. 

module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    req.flash('error_msg', 'Not Authorized')
    res.redirect('/users/login')
}