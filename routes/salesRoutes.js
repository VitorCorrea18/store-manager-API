const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.sales.getAll);
router.get('/:id', controllers.sales.getById);

module.exports = router;
