const services = require('../services');

const getAll = async (__req, res) => {
  const result = await services.sales.getAll();
  return res.status(result.status).json(result.data);
};

const getById = async (req, res) => {
  try {
    const result = await services.sales.getById(req.params.id);
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const create = async ({ body }, res) => {
  const result = await services.sales.create(body);
  return res.status(result.status).json(result.data);
};

module.exports = {
  getAll,
  getById,
  create,
};
