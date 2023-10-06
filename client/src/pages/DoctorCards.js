import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from './DoctorList';

const DoctorCards = () => {
  const [doctor, setDoctor]= useState([]);

  const getUserData= async ()=>{
      const res= await axios.get('/api/v1/user/get-all-doctors', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      if(res.data.success){
        setDoctor(res.data.data);
      }
  }

  useEffect(()=>{
    getUserData();
  }, [])
  return (
    <Layout>
        <h1 className='text-center'>Doctors Available</h1>
        <Row>
          {doctor && doctor.map(doctor=>
            <DoctorList doctor={doctor}/>
          )}
        </Row>
    </Layout>
  )
}

export default DoctorCards