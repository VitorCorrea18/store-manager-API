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
    return res.status(err.status).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await services.products.create({ name, quantity });
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await services.products.update({ id, name, quantity });
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
