const express= require('express');
const { loginController, registerController, authController, applyDoctorController, getNotificationsController, deleteNotificationsController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, contactController, updateUserInfoController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router= express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/contact-us', contactController);

router.post('/getUserData', authMiddleware, authController);

router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.post('/notification', authMiddleware, getNotificationsController);
router.post('/delete-notification', authMiddleware, deleteNotificationsController);
router.get('/get-all-doctors',authMiddleware, getAllDoctorsController);

router.post('/book-appointment', authMiddleware, bookAppointmentController);

router.post('/check-availability', authMiddleware, bookingAvailabilityController);
router.post('/update-user-info',  updateUserInfoController);

router.get('/user-appointments',authMiddleware, userAppointmentsController);

module.exports= router;