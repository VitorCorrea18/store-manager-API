const models = require('../models');
const {
  HTTP_OK,
  HTTP_NOT_FOUND,
  MSG_SALE_NOTFOUND,
  HTTP_CREATED,
  HTTP_NO_CONTENT,

} = require('../utils/consts');

const toCamelCase = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const getAll = async () => {
  const data = await models.sales.getAll();
  const dataCamelCase = data.map(toCamelCase);
  return { ...HTTP_OK, data: dataCamelCase };
};

const getById = async (id) => {
  const data = await models.sales.getById(id);
  const error = { ...HTTP_NOT_FOUND, ...MSG_SALE_NOTFOUND };
  if (!data.length) throw error;
  const dataCamelCase = data.map(toCamelCase);
  return { ...HTTP_OK, data: dataCamelCase };
};

const create = async (newSale) => {
  const saleId = await models.sales.create();
  newSale.forEach(({ productId, quantity }) => models.sales
    .insertProducts(saleId, productId, quantity));
  const data = { id: saleId, itemsSold: newSale };
  return { ...HTTP_CREATED, data };
};

const update = async (saleId, products) => {
  await products.forEach(({ productId, quantity }) => {
    models.sales.update(saleId, productId, quantity);
  });
  const data = { saleId, itemUpdated: products };
  return { ...HTTP_OK, data };
};

const deleteSale = async (saleId) => {
  await models.sales.deleteSale(saleId);
  return { ...HTTP_NO_CONTENT };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};
