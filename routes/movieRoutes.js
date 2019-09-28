const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const movieRoutes = express.Router();
const { addMovie } = require('../db/user');

/**
 * Get movies
 */
movieRoutes.get("", (req, res) => {
  res.send("hit");
});

/**
 * Get movie details by Imdb ID
 */
movieRoutes.get(":id", (req, res) => {

});

/**
 * Get favorite movies
 */
movieRoutes.get("/favorites", requireAuth, (req, res) => {
  res.send(req.user.movies);
});

/**
 * Add movie to favorites
 */
movieRoutes.post("/favorites", requireAuth, async (req, res) => {
  try {
    await addMovie(req.user._id, req.body);
    res.send("Movie added successfully");
  } catch(err) {
    res.status(500).send("Movie add failed");
  }
});

module.exports = movieRoutes;