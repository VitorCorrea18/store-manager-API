const models = require('../models');
const {
  MSG_PRODUCT_NOTFOUND,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_CONFLIT,
  MSG_PRODUCT_EXISTS,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
} = require('../utils/consts');

const getAll = async () => {
  const data = await models.products.getAll();
  return { ...HTTP_OK, data };
};

const getById = async (id) => {
  const data = await models.products.getById(id);
  if (!data) {
    const error = { ...HTTP_NOT_FOUND, ...MSG_PRODUCT_NOTFOUND };
    throw error;
  }
  return { ...HTTP_OK, data };
};

const findByName = async (name) => {
  const data = await models.products.findByName(name);
  if (data.length) {
    const error = { ...HTTP_CONFLIT, ...MSG_PRODUCT_EXISTS };
    return error;
  }
  return false;
};

const create = async ({ name, quantity }) => {
  const error = await findByName(name);
  if (error.status) {
    throw error;
  }
  const data = await models.products.create({ name, quantity });
  return { ...HTTP_CREATED, data };
};

const update = async ({ id, name, quantity }) => {
  await getById(id); // check if ID exists
  const data = await models.products.update({ id, name, quantity });
  return { ...HTTP_OK, data };
};

const deletePct = async (id) => {
  await getById(id); // check if ID exists
  await models.products.deletePct(id);
  return { ...HTTP_NO_CONTENT };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletePct,
};
