const { Priority } = require('../enums/priority');

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().required(),
    priority: Joi.string().valid(...Object.values(Priority)),
    createdAt: Joi.date().iso().required()
  });
  return schema.validate(task);
};

module.exports = validateTask;