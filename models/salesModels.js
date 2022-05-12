const connection = require('./connection');

const toCamelCase = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const getAll = async () => {
  const query = `
  SELECT
  s_p.sale_id,
  sal.date,
  s_p.product_id,
  s_p.quantity
  FROM sales_products AS s_p
  JOIN sales AS sal ON sal.id = s_p.sale_id
  ORDER BY s_p.sale_id, s_p.product_id;
  `;
  const [data] = await connection.execute(query);
  const dataCamelCase = data.map(toCamelCase);
  return dataCamelCase;
};

const getById = async (id) => {
  const query = `
  SELECT 
  sal.date,
  s_p.product_id,
  s_p.quantity
  FROM sales_products as s_p
  JOIN sales as sal
  ON sal.id =  s_p.sale_id
  WHERE sal.id = ?
  `;
  const [data] = await connection.execute(query, [id]);
  const dataCamelCase = data.map(toCamelCase);
  return dataCamelCase;
};

const create = async () => {
  const query = 'INSERT INTO sales (date) VALUE(now())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const insertProducts = async (id, productId, quantity) => {
  const query = `
  INSERT INTO sales_products
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)
  `;
  await connection.execute(query, [id, productId, quantity]);
};

module.exports = {
  getAll,
  getById,
  create,
  insertProducts,
};
