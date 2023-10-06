const express= require('express');
const authMiddleware= require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController, changeStatusController } = require('../controllers/adminController');

const router= express.Router();

router.get('/users', authMiddleware, getAllUsersController);
router.get('/doctors', authMiddleware, getAllDoctorsController);

router.post('/change-status', authMiddleware, changeStatusController);

module.exports= router;