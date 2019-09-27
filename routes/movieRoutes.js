const express = require('express');

const movieRoutes = express.Router();

/**
 * Get movies
 */
movieRoutes.get("", (req, res) => {

});

/**
 * Get movie details by Imdb ID
 */
movieRoutes.get(":id", (req, res) => {

});

/**
 * Get favorite movies
 */
movieRoutes.get("favorites", (req, res) => {

});

/**
 * Add movie to favorites
 */
movieRoutes.post("favorites/:id", (req, res) => {

});

module.exports = movieRoutes;