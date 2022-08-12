/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var jwt = require('jsonwebtoken')
var argon2 = require('argon2')
require('dotenv').config()

module.exports = {
  login: async function(req, res) {
    try {
        
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            res.status(401).json({
                message: "Email is not registered"
            })
        }

        const passwordValid =await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                message: 'Unauthorized'
            })
        }
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1 day" }
        );
        return res
          .status(200)
          .json({ user, accessToken, message: "Loggin successfuly" });


    } catch (error) {
        res.serverError({message:error})
    }
  },
  register: async function(req, res) {
    try {
        const {email, password}= req.body

        const user = await User.findOne({email})
        
        if (user) {
            return res.status(400).json({message: 'Email already exists!'})
        }
        const hashPassword = await argon2.hash(password)

        const newUser = await User.create({
            email, 
            password: hashPassword,
        }).fetch()
        
        const accessToken = jwt.sign(
          { userId: newUser.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        return res.json({
            newUser,
            accessToken, 
            message: 'Create user successfully'
        })
    } catch (error) {
        return res.serverError({message: error})
    }
  }

};

