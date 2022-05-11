const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.products.getAll);
router.get('/:id', controllers.products.getById);

module.exports = router;
