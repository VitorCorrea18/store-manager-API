const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [data] = await connection.execute(query);
  return data;
};

const getById = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const [data] = await connection.execute(query);
  return data[0];
};

const findByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [data] = await connection.execute(query, [name]);
  return data;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES(?,?)';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  const newProduct = { id: insertId, name, quantity };
  return newProduct;
};

const update = async ({ id, name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
  return { id, name, quantity };
};

module.exports = {
  getAll,
  getById,
  findByName,
  create,
  update,
};
