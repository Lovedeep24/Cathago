const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { registerController, loginController, fileController, userController, adminController } = require('../controllers/index')

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/upload', fileController.upload);
router.get('/userprofile/:userId', userController.userProfile);
router.get('/match/:docId',fileController.match);
router.patch('/creditRequest/:userId' ,userController.creditRequest);
router.get('/getcreditrequest', adminController.getCreditRequest);
router.patch('/approve/:userId', adminController.approveCreditRequest);
router.patch('/decline/:userId', adminController.declineCreditRequest);
router.get('/analytics', adminController.getUserScans);
router.get('/topusers', adminController.topUsers);
router.get('/topic', adminController.topTopic);
module.exports = router;