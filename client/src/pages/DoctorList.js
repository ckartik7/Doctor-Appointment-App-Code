import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate= useNavigate();
  return (
    <>
        <div className='card m-2' style={{cursor:'pointer', backgroundColor:'#0275d8', color:'white'}} onClick={()=>{navigate(`/doctor/book-appointment/${doctor._id}`)}}>
            <div className='card-header' style={{textAlign:'center'}}>
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className='card-body'>
                <p>
                    <b>Specialization:</b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience:</b> {doctor.experience}
                </p>
                <p>
                    <b>Fee:</b> {doctor.fees}
                </p>
                <p>
                    <b>Timings:</b> {doctor.timing[0].slice(11,16)} - {doctor.timing[1].slice(11,16)}
                </p>
            </div>
        </div>
    </>
  )
}

export default DoctorList