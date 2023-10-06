import React from 'react'
import '../styles/layout.css'
import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { message, Badge } from 'antd';

const Layout = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        message.success('Logout Successfully')
    }

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Doctors',
            path: '/doctors',
            icon: 'fa-solid fa-stethoscope'
        },
        {
            name: 'Appointments',
            path: '/doctor-appointments',
            icon: 'fa-solid fa-list'
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'fa-solid fa-user'
        }
    ]

    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    return (
        <>
            <div className='main'>
                <div className='layout'>

                    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                        <div className="container-fluid">
                            <div className='logo'>Logo</div>
                            <div className='header'>
                                <div className='header-content'>
                                    <Badge count={user && user.notification.length} onClick={() => { navigate('/notification') }}>
                                        <i className='fa-solid fa-bell' style={{ cursor: 'pointer' }} />
                                    </Badge>

                                    <Link className='link' to={'/profile'}>{user?.name}</Link>
                                </div>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end open " id="navbarNav">
                                <ul className="navbar-nav ">

                                    {SidebarMenu.map(menu => {
                                        const isActive = location.pathname === menu.path
                                        return (
                                            <>

                                                <li className={`nav-item menu-item ${isActive && 'active'}`}>
                                                    <Link className='link' to={menu.path}>{menu.name}</Link>
                                                </li>
                                            </>
                                        )
                                    })}
                                    <div className={`menu-item`} onClick={handleLogout}>

                                        <Link className='link' to={'/login'}>{'Logout'}</Link>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </nav>


                    <div className='content'>

                        <div className='body'>{children}</div>
                    </div>

                    <footer className="bg-primary text-center text-white">

                        <div className="container p-4 pb-0">

                            <section className="mb-4">

                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                                ><i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                                ><i className="fab fa-twitter"></i>
                                </a>

                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                                ><i className="fab fa-instagram"></i></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/chiranjeev-kartik-648848214/" role="button"
                                ><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/ckartik7" role="button"
                                ><i className="fab fa-github"></i></a>
                            </section>

                        </div>
                        <div className="text-center p-3" style={{ backgroundColor: '#0275d8' }}>
                            Made by: Chiranjeev
                        </div>

                    </footer>

                </div>
            </div>
        </>
    )
}

export default Layout