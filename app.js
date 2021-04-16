express = require('express')
session = require('express-session');
path = require('path')
bodyParser = require('body-parser')
exphbs = require('express-handlebars')
mongoose = require('mongoose')
bcrypt = require('bcryptjs')
passport = require('passport')
flash = require('connect-flash');

ideasRoute = require("./routes/Ideas")
usersRoute = require("./routes/Users")
pasportStrategy = require('./config/passportStrategy')

//Use express web application framework in NodeJS 
app = express()

//Middleware for express-handlebars in view layer
app.engine('handlebars', exphbs({
    defaultLayout: 'main' // main => layouts/main.handlebars
}))
app.set('view engine', 'handlebars')

//Ability to define a flash message and render it without redirecting the request.
app.use(flash());


//You need to use bodyParser() if you want the form data to be readily available as req.body in POST operations
app.use(bodyParser.urlencoded({ extended: false })) // for parsing Content-Type:application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing Content-Type:application/json

//Middleware for express-sessions
app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }
    )
);

//Middleware for authentication 

//Step 1: Define passport authentication strategy / logic to authenticate a user
pasportStrategy(passport)
//Step 2: Set strategy in express app
app.use(passport.initialize());
app.use(passport.session());

//Connect to MongoDB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//Enable access to content under folder public i.e. images, css etc. 
app.use(express.static(path.join(__dirname, 'public')))

//Set global variables. These variables are accessible in all apges.
app.use(function (req, res, next) {
    //console.log(req.body)
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    if ( ! res.locals.user ) {
        if ( req.user ) {
            //console.log(req.user)
            //console.log('Ensure global variable user is set to logged in user email ' + req.user.email)
            res.locals.user = req.user.email
        }
    }

    next()
})

//Index route
app.get('/', (req, res) => {
    const _title = 'Hi There !'
    res.render('index', {
        title: _title
    });
})

// About route
app.get('/about', (req, res) => {
    res.render('about')
})

//Use routes
app.use('/users', usersRoute)
app.use('/ideas', ideasRoute)

port = 5000
app.listen(5000, () => {
    console.log('Hello world. Server running at port 5000')
})