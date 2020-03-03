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

app = express()

//Middleware for express-handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main' // main => layouts/main.handlebars
}))
app.set('view engine', 'handlebars')

//Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Middleware for express-sessions
app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }
    )
);

//Passport config
pasportStrategy(passport)

//Middleware for passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Connect to MongoDB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

//Global variables
app.use(function (req, res, next) {
    //console.log(req.body)
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    if (!res.locals.user) {
        if (req.user) {
            //console.log('req.user='+req.user.email)
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

//Use public folders
app.use(express.static(path.join(__dirname, 'public')))

port = 5000
app.listen(5000, () => {
    console.log('Hello world.')
})