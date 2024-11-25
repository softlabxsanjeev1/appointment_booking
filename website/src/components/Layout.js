import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'ri-hospital-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-login-box-line'
        },
    ];

    const menuToBeRedered = userMenu

    return (
        <div className='main'>
            <div className='d-flex layout'>
                {/* sidebar  */}
                <div className='sidebar'>
                    <div className='siidebar-header'>
                        <h2>Sh</h2>
                    </div>
                    <div className='menu'>
                        {menuToBeRedered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        })}
                    </div>
                </div>
                {/* content bar  */}
                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i className='ri-menu-2-fill header-action-icon' onClick={() => { setCollapsed(false) }}></i>
                        ) : (
                            <i className='ri-close-fill header-action-icon' onClick={() => { setCollapsed(true) }}></i>
                        )}
                        <div className='d-flex'>
                            <i className='ri-notification-line header-action-icon'></i>
                            <Link></Link>
                        </div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout