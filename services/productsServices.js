const models = require('../models');
const {
  MSG_PRODUCT_NOTFOUND,
  HTTP_NOT_FOUND,
  HTTP_OK } = require('../utils/consts');

const getAll = async () => {
  const data = await models.products.getAll();
  return { status: HTTP_OK, data };
};

const getById = async (id) => {
  const data = await models.products.getById(id);
  const error = { status: HTTP_NOT_FOUND, msg: MSG_PRODUCT_NOTFOUND };
  if (!data) throw error;
  return { status: HTTP_OK, data };
};

module.exports = {
  getAll,
  getById,
};
