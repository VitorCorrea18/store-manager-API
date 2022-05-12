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
  console.log('findByName Models', name);
  const query = `SELECT * FROM products WHERE name = ?`;
  // veirficar se o erro esta na query
  const [data] = await connection.execute(query, [name]);
  console.log(data);
  return data;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES(?,?)';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  const newProduct = { id: insertId, name, quantity };
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  findByName,
  create,
};
