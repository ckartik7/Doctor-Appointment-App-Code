const doctorModel = require('../models/doctorModels');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModels');

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(201).send({ message: 'Doctors data fetched successfully.', success: true, data: doctor })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong.', success: false, error })
    }
}

const updateDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({ message: 'Profile updated successfully', success: true, data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Doctor profile update issue.', success: false, error })
    }
}

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(201).send({ message: 'Doctor Information', success: true, data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Unable to get doctor information.', error, success: false })
    }
}

const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id })
        res.status(201).send({ message: 'Doctor appointments', success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong.', success: false, error });
    }
}

const updateStatusController = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status });
        const user = await userModel.findOne({ _id: appointment.userId });
        user.notification.push({
            type: 'status- updated',
            message: `Your appointment request has been updated: ${status}`,
            onClickPath: '/doctor-appointments'
        })
        await user.save();
        res.status(201).send({ message: 'Appointment status updated', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', success: false, error });
    }
}

module.exports = { getDoctorInfoController, updateDoctorInfoController, getDoctorByIdController, doctorAppointmentsController, updateStatusController };