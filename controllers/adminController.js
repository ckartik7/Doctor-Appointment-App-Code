const userModel= require('../models/userModels');
const doctorModel= require('../models/doctorModels');


const getAllUsersController= async (req, res)=>{
    try {
        const users= await userModel.find({});
        res.status(201).send({success:true, message:'Users data', data:users})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Unable to fetch users.', error})
    }
}

const getAllDoctorsController= async (req, res)=>{
    try {
        const doctors= await doctorModel.find({});
        res.status(201).send({success:true, message:'Doctors data', data:doctors})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Unable to fetch doctors.', error})
    }
}

const changeStatusController= async (req, res)=>{
    try {
        const {doctorId, status}= req.body
        const doctor= await doctorModel.findByIdAndUpdate(doctorId,{status});
        const user= await userModel.findOne({_id: doctor.userId})
        const notification= user.notification;
        notification.push({
            type: 'doctor-account-request-update',
            message: `Your doctor account request is ${status}`,
            onClickPath: '/notification'
        })
        user.isDoctor= status === 'approved'?true:false;
        await user.save();
        res.status(201).send({
            success:true, message:'Account status updated', data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: 'Error', error})
    }
}

module.exports= {getAllUsersController, getAllDoctorsController, changeStatusController};