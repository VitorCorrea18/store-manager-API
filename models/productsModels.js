const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM products`;
  const [data] = await connection.execute(query);
  return data;
};

const getById = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const [data] = await connection.execute(query);
  return data[0];
};

module.exports = {
  getAll,
  getById,
};

