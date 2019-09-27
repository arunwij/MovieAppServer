const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../db');

const requireAuth = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 

  if (token) {
    jwt.verify(token, config.jwt_secret, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        const userId = decoded.userId;
        try { 
          const user = await User.findById(userId);
          if(user) {
            req.user = user;
            next();
          } else {
            throw new Error('User not found');
          }
        } catch(err) {
          res.status(401).send(err.message)
        }
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = requireAuth;
