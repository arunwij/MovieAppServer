const express = require('express');

const userRoutes = express.Router();

userRoutes.get("", (req, res) => {
  res.send(req.body);
});

module.exports = userRoutes;
