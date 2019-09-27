const Joi = require('@hapi/joi');

// validater function for incoming requests
const requireValidate = (schema={}) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if(result.error === null) {
      next();
    } else {
      const errorData = result.error.details.map(error => {
        return error.message;
      });
      res.status(400).send(errorData);
    }
  };
};

module.exports = requireValidate;
