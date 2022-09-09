const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const userAuth = require('../Auth');

router.route('/').get(userAuth,(req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/signup').post(async(req, res) => {
    const newUser = new User({name : req.body.name, password : req.body.password});
        try{
            const result = await newUser.save()
            res.json(result)
        }
        catch(error) {
            res.status(400).json('Error : ' + error)
        }
})

router.route('/login/').get((req, res) => {
    let token = jwt.sign({ user: req.query.name }, process.env.JWT_PRIVATE_KEY);
    console.log(token);
    User.find({name : req.query.name})
    .then(result => result.length > 0 ? result[0].password == req.query.password ? res.json({result, token}) : res.status(400).json('Invalid credentials')  : res.status(404).json('User not found!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

module.exports = router;