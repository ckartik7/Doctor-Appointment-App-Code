import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';

const Profile = () => {

    const user = useSelector((state) => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDoctorInfo = async () => {

        const res = await axios.post('/api/v1/doctor/get-doctor-info', { userId: params.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        if (res.data.success) {
            setDoctor(res.data.data);
        }

    }

    const handleFinish = async (values) => {
        try {

            dispatch(showLoading())
            const res = await axios.post('/api/v1/doctor/update-doctor-info', { ...values, userId: user._id, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
    useEffect(() => {
        getDoctorInfo();
    }, [])
    return (
        <Layout>
            <h1 className='text-center m-2'>Profile</h1>
            {doctor &&
                <Form layout='vertical' onFinish={handleFinish} className='m-5' initialValues={doctor}>
                    <h4 style={{ color: 'white' }}>Personal Details</h4>
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
                            <Form.Item label={<label style={{ color: "white" }}>Website</label>} name={'website'}>
                                <Input type='url' placeholder='Website'></Input>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={<label style={{ color: "white" }}>Address</label>} name={'address'} required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Address'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4 style={{ color: 'white' }}>Professional Details</h4>
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

                    </Row>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Update</button>
                    </div>
                </Form>}
        </Layout>
    )
}

export default Profile