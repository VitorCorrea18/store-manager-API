const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.sales.getAll);
router.get('/:id', controllers.sales.getById);

module.exports = router;
