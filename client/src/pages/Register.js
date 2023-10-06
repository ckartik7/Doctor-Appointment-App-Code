import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/register.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
  const navigate= useNavigate();

  const onfinishHandle= async(values)=>{
    try {
      navigate(showLoading());
      const res= await axios.post('/api/v1/user/register', values);
      navigate(hideLoading());
      if(res.data.success){
      message.success('Registration successfull.')
      navigate('/login');
      } else{
        message.error(res.data.message);
      }
    } catch (error) {
      navigate(hideLoading());
      message.error('Something went wrong')
    }
  };

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandle} className='register-form'>
          <h1>Register</h1>
          <Form.Item label={<label style={{ color: "white" }}>Name</label>} name='name'>
            <Input type='text' required/>
          </Form.Item>
          <Form.Item label={<label style={{ color: "white" }}>Email</label>} name='email'>
            <Input type='text' required/>
          </Form.Item>
          <Form.Item label={<label style={{ color: "white" }}>Password</label>} name='password'>
            <Input type='password' required/>
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Register</button>
          <Link to={'/login'}>Already Signed Up?</Link>
        </Form>
      </div>
    </>
  )
}

export default Register