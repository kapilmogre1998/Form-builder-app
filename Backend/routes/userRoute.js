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
            return res.status(400).json({msg: 'Email already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = await User.create({
            username,
            email,
            password:hashedPassword
        });

        const token = jwt.sign({_id:userData._id},process.env.JWT_SECRET_KEY)

        if(token){
            res.status(200).json({
                token, 
                userData: {
                    userId: userData._id, 
                    userName: userData.username, 
                    email: userData.email,
                },
                msg:'Signup successful'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Something went wrong'})
    }
})

router.post('/login',async(req,res)=> {
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({ email })
        if(!userExists){
            return res.status(400).json({ msg: "User does not exist" })
        }

        const isMatched = await bcrypt.compare(password,userExists.password)

        if (!isMatched) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        const token = jwt.sign({_id:userExists._id},process.env.JWT_SECRET_KEY)

        if(isMatched && token){
            res.status(200).json({
                token, 
                userData: {
                    userId: userExists._id, 
                    userName: userExists.username, 
                    email: userExists.email ,
                },
                msg:'Login successful'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong'})
    }
})

module.exports = router;