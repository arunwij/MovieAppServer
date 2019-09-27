const express = require('express');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../db');
const { signIn, signUp } = require('../validations/user');

const authRouter = express.Router();

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    await Joi.validate({email, password}, signIn);
    const user = await User.findByEmail(email);

    if(user && user.comparePasswords(password)) {
      const token = jwt.sign({userId: user._id}, config.jwt_secret);
      res.send({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastname: user.lastName,
          email: user.email
        },
        token
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = {firstName, lastName, email, password};
    await Joi.validate(user, signUp);
    await User.create(user);
    res.send("SignUp Success");
  } catch(err) {
    res.status(500).send(err.message);
  }
});

module.exports = authRouter;