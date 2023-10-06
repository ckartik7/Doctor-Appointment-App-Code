import React from 'react'
import Layout from '../components/Layout'
import { Form, Input, message } from 'antd'
import '../styles/register.css'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const UserProflie = () => {
    const user= useSelector((state)=>state.user)
    const navigate= useNavigate();
    const dispatch= useDispatch();

    const handleFinish = async (values) => {
        try {

            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/update-user-info', { ...values, userId: user._id, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
                window.location.reload();
            }
            else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error('Something went wrong.')
        }
    }

    return (
        <Layout>
            <div className='form-container'>
                <Form layout='vertical' onFinish={handleFinish} className='register-form'>
                    <h1 className='text-center' style={{ color: 'white' }}>Update Profile</h1>
                    <Form.Item label={<label style={{ color: "white" }}>Name</label>} name={'name'}>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "white" }}>Email</label>} name={'email'}>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "white" }}>Password</label>} name={'password'}>
                        <Input type='text' required />
                    </Form.Item>
                    <button className='btn btn-primary' type='submit'>Update</button>
                </Form>
            </div>
        </Layout>
    )
}

export default UserProflie