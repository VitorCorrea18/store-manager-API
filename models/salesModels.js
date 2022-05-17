const connection = require('./connection');

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
  return data;
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
  return data;
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

const update = async (id, productId, quantity) => {
  const query = `
  UPDATE sales_products 
  SET product_id = ?, quantity = ? 
  WHERE sale_id = ?
  `;
  await connection.execute(query, [productId, quantity, id]);
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  await connection.execute(query, [id]);
  const query2 = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query2, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  insertProducts,
  update,
  deleteSale,
};
