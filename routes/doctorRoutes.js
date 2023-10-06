const express= require('express');
const authMiddleware= require('../middlewares/authMiddleware')
const {getDoctorInfoController, updateDoctorInfoController, getDoctorByIdController, doctorAppointmentsController, updateStatusController}= require('../controllers/doctorController')

const router= express.Router();

router.post('/get-doctor-info', authMiddleware, getDoctorInfoController);
router.post('/update-doctor-info', updateDoctorInfoController)

router.post('/get-doctor-by-id', authMiddleware, getDoctorByIdController)

router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController)
router.post('/update-status', authMiddleware, updateStatusController)

module.exports= router;