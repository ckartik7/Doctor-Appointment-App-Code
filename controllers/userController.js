const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModels = require('../models/doctorModels');
const appointmetModel = require('../models/appointmentModel');
const moment = require('moment');
const contactModel= require('../models/contactModel');

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(200).send({ success: false, message: `User already exists.` });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ success: true, message: `Registration successfull` });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Registration unsuccessfull: ${error.message}` })
    }
};

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: `User not found.`, success: false });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(200).send({ message: `Please enter correct email or password.`, success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Successfull!', success: true, token: token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Login Error', success: false })
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            res.status(201).send({ message: 'User not found.', success: false })
        }
        else {
            res.status(201).send({ success: true, data: user })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Authorization Failed', success: false })
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModels({ ...req.body, status: 'pending' })
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied.`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + ' ' + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({ success: true, message: 'Doctor account applied successfully.' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: 'Error while applying.' })
    }
}

const getNotificationsController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        res.status(201).send({ success: true, message: 'All notifications read.', data: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong', error })
    }
}

const deleteNotificationsController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(201).send({
            success: true, message: 'All notifications deleted.', data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Unable to delete notifictions.', error })
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModels.find({ status: 'approved' });
        res.status(201).send({ message: 'Doctors list fetched successfully', success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Unable to fetch doctors list.', success: false, error })
    }
}

const bookAppointmentController = async (req, res) => {
    try {
        req.body.time = moment(req.body.time, 'dd-mm-yyyy').toISOString();
        req.body.date = moment(req.body.date, 'hh:mm').toISOString();
        req.body.status = 'pending';
        const newAppointment = new appointmetModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: 'new-appointment-request',
            message: `A new appointment request from ${req.body.userInfo.name}.`,
            onClickPath: '/user/appointments'
        })
        await user.save();
        res.status(201).send({ message: 'Appointment booked successfully.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Unable to book appointment.', error, success: false })
    }
}

const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'dd:mm').toISOString();
        const fromTime = moment(req.body.time, 'hh:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'hh:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmetModel.find({
            doctorId, date, time: {
                $gte: fromTime, $lte: toTime
            }
        })
        if(appointments.length>0){
            res.status(200).send({message:'Appointment not available', success: false})
        }
        else {
            res.status(201).send({message:'Appointment available', success: true})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Something went wrong.', error, success: false});
    }
}

const userAppointmentsController= async (req, res)=>{
    try {
        const appointments= await appointmetModel.find({userId:req.body.userId});
        res.status(201).send({message:'User appointments.', success:true, data:appointments})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Something went wrong.', success:false, error})
    }
}

const contactController= async (req, res)=>{
    try {

        const newContact = new contactModel(req.body);
        await newContact.save();
        res.status(201).send({ success: true, message: `We will contact you shortly.` });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Unable to save contact.` })
    }
}

const updateUserInfoController = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const user = await userModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({ message: 'Profile updated successfully', success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'User profile update issue.', success: false, error })
    }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getNotificationsController, deleteNotificationsController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, contactController, updateUserInfoController };