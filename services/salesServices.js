const models = require('../models');
const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  MSG_SALE_NOTFOUND,

} = require('../utils/consts');

const getAll = async () => {
  const data = await models.sales.getAll();
  return { status: HTTP_OK, data };
};

const getById = async (id) => {
  const data = await models.sales.getById(id);
  const error = { status: HTTP_NOT_FOUND, msg: MSG_SALE_NOTFOUND };
  if (!data.length) throw error;
  return { status: HTTP_OK, data };
};

module.exports = {
  getAll,
  getById,
};
