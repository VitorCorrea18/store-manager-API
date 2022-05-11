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
  if (!data.length) throw { status: HTTP_NOT_FOUND, message: MSG_SALE_NOTFOUND };
  return { status: HTTP_OK, data };
};

module.exports = {
  getAll,
  getById,
};

