const models = require('../models');
const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  MSG_SALE_NOTFOUND,
  HTTP_CREATED,

} = require('../utils/consts');

const getAll = async () => {
  const data = await models.sales.getAll();
  return { ...HTTP_OK, data };
};

const getById = async (id) => {
  const data = await models.sales.getById(id);
  const error = { ...HTTP_NOT_FOUND, ...MSG_SALE_NOTFOUND };
  if (!data.length) throw error;
  return { ...HTTP_OK, data };
};

const create = async (newSale) => {
  const saleId = await models.sales.create();
  newSale.forEach(({ productId, quantity }) => models.sales
    .insertProducts(saleId, productId, quantity));
  const data = { id: saleId, itemsSold: newSale };
  return { ...HTTP_CREATED, data };
};

module.exports = {
  getAll,
  getById,
  create,
};
