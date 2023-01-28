const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/expressLimiter');
const authentication = require('../middlewares/authentication');
const controllers = require('../controllers/professional.controller');

router.post('/signup', controllers.signup);
router.post('/login', controllers.login, limiter.max);
router.get('/professional', authentication, controllers.getAllProfessionals);
router.get('/professional/:id', authentication, controllers.getOneProfessional);
router.patch('/professional/:id', authentication, controllers.updateProfessional);
router.delete('/professional/:id', authentication, controllers.deleteProfessional);

module.exports = router;