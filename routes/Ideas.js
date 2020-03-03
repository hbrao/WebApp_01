express = require("express")
mongoose = require("mongoose")
checkAuth = require('../helper/auth')

router = express.Router()

//Load idea model. 
require('../models/Idea')
Idea = mongoose.model('ideas')

//Add Idea form
router.get('/add', checkAuth, (req, res) => {
    res.render('ideas/add')
})

//Process Form
router.post('/add', checkAuth, (req, res) => {
    let _errors = []
    if (!req.body.title) {
        _errors.push({
            text: 'Please add a title'
        })
    }
    if (!req.body.details) {
        _errors.push({
            text: 'Please add some details'
        })
    }
    if (_errors.length > 0) {
        res.render('ideas/add', {
            errors: _errors,
            tilte: req.body.title,
            details: req.body.details
        })
    } else {
        newIdea = {
            title: req.body.title,
            user: req.user.id,
            details: req.body.details
        }
        new Idea(newIdea).save()
            .then(new_idea => res.redirect('/ideas'))
    }
})

//Display 
router.get('/', checkAuth, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'descending' })
        .then(ideas_found => {
            res.render('ideas/index', {
                ideas: ideas_found
            })
        })

})

module.exports = router