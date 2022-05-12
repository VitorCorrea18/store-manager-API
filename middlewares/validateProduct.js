const Joi = require('joi');
const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTRY } = require('../utils/consts');

const SCHEMA = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

// na dificuldade de enviar codigo de status diferentes para cada situação usando Joi,
// peguei essa referencia do ternario no reposiório da colega [nina]Marina Fischer.

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = SCHEMA.validate({ name, quantity });
  if (error) {
    const status = error.message.includes('required')
      ? HTTP_BAD_REQUEST : HTTP_UNPROCESSABLE_ENTRY;

    next({ ...status, message: error.message });
  }
  next();
};

module.exports = validateProduct;
