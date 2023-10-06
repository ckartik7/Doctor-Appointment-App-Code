import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { Table } from 'antd';

const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {

        const res = await axios.get('/api/v1/admin/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        if (res.data.success) {
            setUsers(res.data.data)
        }

    }

    useEffect(() => {
        getUsers();
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            responsive: ['md']
        },
        {
            title: 'Doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => (
                <span>
                    {record.isDoctor ? 'Yes' : 'No'}
                </span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
    ]
    return (
        <Layout>
            <h1 className='text-center'>Users List</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users