const router = require('express').Router();
const userController = require('../controller/user.controller');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/getuser/:id', userController.getUser);
router.post('/following/:process', userController.addFollower);

module.exports = router;
