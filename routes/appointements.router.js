const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/expressLimiter');
const authentication = require('../middlewares/authentication');
const controllers = require('../controllers/appointements.controller');

router.post('/appointements', limiter, authentication, controllers.create);
router.delete('/:id', limiter, authentication, controllers.delete);
router.patch('/:id', limiter, authentication, controllers.update);
router.get('/:id', limiter, authentication, controllers.getOne);
router.get('/pro/appointements', limiter, authentication, controllers.getAllByProfessional);
router.get('/user/appointements', limiter, authentication, controllers.getAllByUser);

module.exports = router;