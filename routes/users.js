const router = require('express').Router();
const formidable = require('formidable');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + err))
})

router.route('/add').post(async(req, res) => {
    const newUser = new User({name : req.body.name});
        try{
            const result = await newUser.save()
            res.json(result)
        }
        catch(error) {
            res.status(400).json('Error : ' + error)
        }
})

module.exports = router;