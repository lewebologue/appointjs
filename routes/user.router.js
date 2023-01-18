const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/expressLimiter')
const authentication = require('../middlewares/authentication');
const controllers = require('../controllers/user');


router.post ('/signup', controllers.signup);
router.post ('/login', controllers.login, limiter.max);
router.get ('/user', authentication, controllers.getAllUsers);
router.get ('/user/:id', authentication, controllers.getOneUser);
router.patch ('/user/:id', authentication, controllers.updateUser);
router.delete ('/user/:id', authentication, controllers.deleteUser);

module.exports = router;