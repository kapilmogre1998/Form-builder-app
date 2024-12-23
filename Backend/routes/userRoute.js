const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isEmailExists = await User.findOne({email});

        if(isEmailExists){
            return res.status(400).json({message: 'Email already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        await User.create({
            username,
            email,
            password:hashedPassword
        });
        res.status(200).json({message:'User created successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

router.post('/login',async(req,res)=> {
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({ email })
        if(!userExists){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatched = await bcrypt.compare(password,userExists.password)

        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({_id:userExists._id},process.env.JWT_SECRET_KEY)

        if(isMatched && token){
            res.status(200).json({token,message:'Login successful'})
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;