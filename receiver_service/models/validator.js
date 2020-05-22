const Joi = require("joi");

module.exports = {
  validateEventSchema(user) {
    const schema = {
      id: Joi.string().required(),
      date_created: Joi.date().required(),
      userId: Joi.string().required(),
      filterValue: Joi.boolean().required(),
    };
    return Joi.validate(user, schema);
  },
  validateUserSchema(user) {
    const schema = {
      id: Joi.string().required(),
      date_created: Joi.date().required(),
      location: Joi.string().required(),
    };
    return Joi.validate(user, schema);
  },
};
