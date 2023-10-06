import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { Table, message } from 'antd';
import moment from 'moment';
import '../../styles/DoctorAppointment.css'

const DoctorAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {

        const res = await axios.get('/api/v1/doctor/doctor-appointments',
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        if (res.data.success) {
            setAppointments(res.data.data);
        }

    }

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/doctor/update-status', { appointmentId: record._id, status },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                })
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.')
        }
    }

    useEffect(() => {
        getAppointments();
    }, [])

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            responsive: ['md']
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text, record) =>
            (
                <div className='d-flex'>
                    {
                        record.status === 'pending' && (
                            <div className='d-flex'>
                                <button className='btn btn-success ms-2' onClick={() => handleStatus(record, text = 'approved')}>Approve</button>
                                <button className='btn btn-danger' onClick={() => handleStatus(record, text = 'rejected')}>Reject</button>
                            </div>
                        )
                    }
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h1 className='text-center' style={{ margin: '4rem' }}>Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments