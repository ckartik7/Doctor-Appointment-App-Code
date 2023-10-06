import { Form, Input, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Contact.css'

const Contact = () => {
    const navigate = useNavigate();

    const handleFinish = async (values) => {

        try {
            const res = await axios.post('/api/v1/user/contact-us', values);
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error('Something went wrong.')
        }
    }

    return (
        <>
            <div className='form-container'>
                <Form layout='vertical' onFinish={handleFinish} className='contact-form'>
                    <h1>Contact Us</h1>
                    <Form.Item label={<label style={{ color: "white" }}>Name</label>} name={'name'}>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "white" }}>Email</label>} name={'email'}>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "white" }}>Comment</label>} name={'text'}>
                        <TextArea />
                    </Form.Item>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </Form>
            </div>
        </>
    )
}

export default Contact