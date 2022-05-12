const models = require('../models');
const {
  MSG_PRODUCT_NOTFOUND,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_CONFLIT,
  MSG_PRODUCT_EXISTS,
  HTTP_CREATED,
} = require('../utils/consts');

const getAll = async () => {
  const data = await models.products.getAll();
  return { ...HTTP_OK, data };
};

const getById = async (id) => {
  const data = await models.products.getById(id);
  const error = { ...HTTP_NOT_FOUND, ...MSG_PRODUCT_NOTFOUND };
  if (!data) throw error;
  return { ...HTTP_OK, data };
};

const findByName = async (name) => {
  console.log('find', name);
  const data = await models.products.findByName(name);
  console.log('resposta do findName', data);
  if (data.length) {
    const error = { ...HTTP_CONFLIT, ...MSG_PRODUCT_EXISTS };
    return error;
  }
  return false;
};

const create = async ({ name, quantity }) => {
  console.log('services', name, quantity);
  const error = await findByName(name);
  console.log('resultado do error', error);
  if (error.status) {
    throw error;
  }
  const data = await models.products.create({ name, quantity });
  return { ...HTTP_CREATED, data };
};

module.exports = {
  getAll,
  getById,
  create,
};
