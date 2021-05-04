const Joi = require("joi");

const categorySchema = (data) => {
  const schema = Joi.object({
    _id: Joi.any(),
    name: Joi.string().min(3).required(),
  });

  return schema.validateAsync(data);
};
const productSchema = (data) => {
  const schema = Joi.object({
    _id: Joi.any(),
    name: Joi.string().min(2).required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    desc: Joi.string(),
    category: Joi.any(),
  });

  return schema.validateAsync(data);
};
const userRegisterSchema = (data) => {
  const schema = Joi.object({
    _id: Joi.any(),
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validateAsync(data);
};
const userLoginSchema = (data) => {
  const schema = Joi.object({
    _id: Joi.any(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validateAsync(data);
};

module.exports = {
  categorySchema,
  productSchema,
  userRegisterSchema,
  userLoginSchema,
};
