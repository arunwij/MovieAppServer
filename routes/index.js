// const express = require('express');
// const router = express.Router();
// const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const config = require('../config');
// const { userModal } = require('../db');
// const { requireValidate, requireUsernameEmailUnique } = require('../middlewares');
// const { EMAIL_REGEX, PW_REGEX } = require('../constants');


/* GET home page. */
// router.get('/', (req, res) => {
//   res.send("Welcome to Mirada Media - Sertainty API");
// });

/* POST login*/
// const loginSchema = Joi.object().keys({
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
// }).required();

// router.post('/login', requireValidate(loginSchema), async (req, res) => {
//   const { username, password } = req.body;
//   let result = await userModal.findUserByUsername(username);

//   if(result.success) {
//     if(result.data){
//       const match = await bcrypt.compare(password, result.data.password);
//       if(match) {
//         const token = jwt.sign({userId: result.data._id}, config.jwt_secret);
//         delete result.data.password;
//         delete result.data.__v;
        
//         res.send({token, user: result.data});
//       } else {
//         res.status(400).send("Invalid credentials");
//       }
//     } else {
//       res.status(400).send("Invalid credentials");
//     }
//   } else {
//     res.status(500).send(result.data);
//   }
// }); 

/**
 * POST /register
 */

// register request validation
// const registerSchema = Joi.object().keys({
//   firstName: Joi.string().alphanum().min(3).max(30).required(),
//   lastName: Joi.string().alphanum().min(3).max(30).required(),
//   email: Joi.string().regex(EMAIL_REGEX).required(),
//   password: Joi.string().regex(PW_REGEX).required()
// }).required();


// router.post('/register', [requireValidate(registerSchema), requireUsernameEmailUnique], async (req, res) => {
//   // hash the incoming plain text password
//   const pwHash = await bcrypt.hash(req.body.password, 10);
//   const user = Object.assign(req.body, {password: pwHash});
//   let result = await userModal.create(user);

//   if(result.success) {
//     // remove mongoose document version. 
//     delete result.data.__v;    
//     res.send("User registered successfully");
//   } else {
//     res.status(500).send(result.data);
//   }
// });

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

module.exports = {
  userRoutes,
  authRoutes
};
