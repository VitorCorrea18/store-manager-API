const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', controllers.products.getAll);
router.get('/:id', controllers.products.getById);
router.post('/', middlewares.validateProduct, controllers.products.create);

module.exports = router;
