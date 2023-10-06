import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {

    const res = await axios.get('/api/v1/user/user-appointments',
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
    if (res.data.success) {
      setAppointments(res.data.data);
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
  ];

  return (
    <Layout>
      <h1 className='text-center'>Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments