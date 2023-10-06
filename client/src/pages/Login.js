import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/register.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Login = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch()

  const onfinishHandle= async (values)=>{

    try {
      dispatch(showLoading());
      const res= await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem('token', res.data.token)
        message.success(res.data.message);
        navigate('/');
      } else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something went wrong.')
    }
  }

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandle} className='register-form'>
          <h1>Login</h1>
          <Form.Item label={<label style={{ color: "white" }}>Email</label>} name={'email'}>
            <Input type='text' required/>
          </Form.Item>
          <Form.Item label={<label style={{ color: "white" }}>Password</label>} name={'password'}>
            <Input type='password' required/>
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Login</button>
          <Link to={'/register'}>Not a user?</Link>
        </Form>
      </div>
    </>
  )
}

export default Login