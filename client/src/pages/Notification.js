import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import '../styles/Notifications.css'

const Notification = () => {
    const { user } = useSelector((state) => state.user)
    const navigate= useNavigate();
    const dispatch= useDispatch();

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res= await axios.post('/api/v1/user/notification', {userId: user._id}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            window.location.reload();
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }
            else{
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something went wrong.');
        }
     }
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res= await axios.post('/api/v1/user/delete-notification', {userId: user._id}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            window.location.reload();
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }
            else{
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something went wrong.')
        }
     }

    return (
        <Layout>
            <h4 className='p-3 text-center'>Notifications</h4>
            <Tabs>
                <Tabs.TabPane tab='Unread' key={0} >
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' style={{color:'white', cursor:'pointer'}} onClick={handleMarkAllRead}>
                            Mark All Read
                        </h4>
                    </div>
                    {user?.notification.map((notificationMgs) => (
                        <div className="card" >
                            <div className="card-text" >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' style={{color:'white', cursor:'pointer'}} onClick={handleDeleteAllRead}>
                            Delete All Read
                        </h4>
                    </div>
                    {user?.seenNotification.map((notificationMgs) => (
                        <div className="card" >
                            <div className="card-text" >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification;