const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.products.getAll);
router.get('/:id', controllers.products.getById);

module.exports = router;

