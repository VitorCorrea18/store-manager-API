const services = require('../services');

const getAll = async (__req, res) => {
  const result = await services.products.getAll();
  return res.status(result.status).json(result.data);
};

const getById = async (req, res) => {
  try {
    const result = await services.products.getById(req.params.id);
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json(err.msg);
  }
};

module.exports = {
  getAll,
  getById,
};
