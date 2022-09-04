//Authentication route
const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../routes/validation');


    

router.post('/register', async (req,res)=>{
    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Exist email validation
    const emailExist  = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists.');
    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req,res)=>{
    //Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //User validation
    const userExist  = await User.findOne({email: req.body.email});
    if(!userExist) return res.status(400).send('User does not exists.');
    //Password checking
    const validPass = await bcrypt.compare(req.body.password, userExist.password);
    if(!validPass) return res.status(400).send('Invalid password.');
    //Create token
    const token = jsonwebtoken.sign({_id: userExist._id, name: userExist.name, email: userExist.email, password: userExist.password}, process.env.TOKEN);
    res.header('auth-token', token).send(token);
    res.send('Welcome');

});

module.exports = router;