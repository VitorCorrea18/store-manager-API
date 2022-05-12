const Joi = require('joi');
const { HTTP_UNPROCESSABLE_ENTRY, HTTP_BAD_REQUEST } = require('../utils/consts');

const SCHEMA = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSales = (req, res, next) => {
  const { productId, quantity } = req.body;
  const { error } = SCHEMA.validate({ productId, quantity });
  if (error) {
    const status = error.message.includes('required')
      ? HTTP_BAD_REQUEST : HTTP_UNPROCESSABLE_ENTRY;

    next({ status, message: error.message });
  }
  next();
};

module.exports = validateSales;
