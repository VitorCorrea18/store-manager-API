const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', controllers.sales.getAll);
router.get('/:id', controllers.sales.getById);
router.post('/', middlewares.validateSales, controllers.sales.create);
router.put('/:id', middlewares.validateSales, controllers.sales.update);

module.exports = router;
