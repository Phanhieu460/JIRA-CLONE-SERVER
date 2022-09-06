/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require("jsonwebtoken");
var argon2 = require("argon2");

require("dotenv").config();

module.exports = {
  async getUserById(req, res) {
    const user = await User.findOne({ id: req.params.id });
    try {
      if (user) {
        res.status(200).json({
          success: true,
          user,
          message: "Fetch user successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          data: null,
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  async getAll(req, res) {
    const user = await User.find({});
    try {
      if (user) {
        res.status(200).json({
          success: true,
          user,
          message: "Fetch all user successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          data: null,
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      const newUser = await User.findOne({ email });
      if (!newUser) {
        res.status(401).json({
          success: false,
          message: "Email is not registered",
        });
      }
      const passwordValid = await argon2.verify(newUser.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
      const accessToken = jwt.sign(
        { userId: newUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1 day" }
      );
      return res
        .status(200)
        .json({
          success: true,
          newUser,
          accessToken,
          message: "Loggin successfuly",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  register: async function (req, res) {
    try {
      const { email, password, fullName } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists!" });
      }
      const hashPassword = await argon2.hash(password);

      const newUser = await User.create({
        email,
        password: hashPassword,
        fullName,
        imageUrl: req.params.imageUrl,
      }).fetch();

      const accessToken = jwt.sign(
        { userId: newUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        success: true,
        newUser,
        accessToken,
        message: "Create user successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  async update(req, res) {
    try {
      const { fullName, imgUrl } = req.body;

      let attributes = {};

      if (fullName) {
        attributes.fullName = fullName;
      }
      if (imgUrl) {
        attributes.imgUrl = imgUrl;
      }

      const result = await User.update({ id: req.params.id }, attributes);

      return res.status(200).json({
        success: true,
        result,
        message: "User Updated Successfully",
      });
    } catch (error) {
      return res.serverError({ message: error, success: false });
    }
  }
};
