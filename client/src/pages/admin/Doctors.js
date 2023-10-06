import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { Table, message } from 'antd';

const Doctors = () => {

    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {

        const res = await axios.get('/api/v1/admin/doctors', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        if (res.data.success) {
            setDoctors(res.data.data)
        }

    }

    useEffect(() => {
        getDoctors();
    }, [])

    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/change-status', { doctorId: record._id, userId: record.userId, status: status }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            message.error('Something went wrong.')
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            responsive: ['md']
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button> : <button className='btn btn-danger'>Reject</button>}
                </div>
            )
        },
    ]

    return (
        <Layout>
            <h1 className='text-center'>Doctors</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctors