import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFinish = async (values) => {
        try {

            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', { ...values, userId: user._id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
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
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h4 style={{color:'white'}}>Personal Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>First Name</label>} name={'firstName'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='First Name'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Last Name</label>} name={'lastName'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Last Name'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Phone No.</label>} name={'phone'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Phone'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Email</label>} name={'email'} required rules={[{ required: true }]}>
                            <Input type='email' placeholder='Email'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>website</label>} name={'website'}>
                            <Input type='url' placeholder='Website'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Address</label>} name={'address'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Address'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <h4 style={{color:'white'}}>Professional Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Specialization</label>} name={'specialization'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Specializaton'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Experience</label>} name={'experience'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Experience'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Fee per Consultation</label>} name={'fees'} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Fees'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label={<label style={{ color: "white" }}>Time</label>} name={'timing'} required>
                            <TimePicker.RangePicker format={'HH:mm'}></TimePicker.RangePicker>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor;