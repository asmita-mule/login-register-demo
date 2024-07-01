import React, { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Avatar, IconButton, Badge } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import './Dashboard.css';
import LogoutIcon from '@mui/icons-material/Logout';
function Dashboard() {

    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const users = [
        { id: 1, name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/14.jpg', dateCreated: '2024-06-01', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/60.jpg', dateCreated: '2024-06-02', role: 'User', status: 'inactive' },
        { id: 3, name: 'Samuel Green', image: 'https://randomuser.me/api/portraits/men/53.jpg', dateCreated: '2024-06-03', role: 'User', status: 'suspended' },
        { id: 4, name: 'Emily White', image: 'https://randomuser.me/api/portraits/women/90.jpg', dateCreated: '2024-06-04', role: 'User', status: 'active' },
        { id: 5, name: 'James Brown', image: 'https://randomuser.me/api/portraits/women/49.jpg', dateCreated: '2024-06-05', role: 'User', status: 'inactive' },
        { id: 6, name: 'Linda Wilson', image: 'https://randomuser.me/api/portraits/men/44.jpg', dateCreated: '2024-06-06', role: 'User', status: 'active' },
        { id: 7, name: 'Michael Anderson', image: 'https://randomuser.me/api/portraits/men/2.jpg', dateCreated: '2024-06-07', role: 'User', status: 'active' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'green';
            case 'inactive':
                return 'grey';
            case 'suspended':
                return 'red';
            default:
                return 'grey';
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <div className="sidebar-header">
                        <h3>Dashboard</h3>
                    </div>
                    <ul className="sidebar-menu">
                        <li className='active'>users</li>
                    </ul>
                </Col>
                <Col md={10} className="main-content p-0">
                    <header className="header">
                        <div className="profile-section">
                            <Avatar alt="Profile Picture" src="https://randomuser.me/api/portraits/men/44.jpg" />
                            <span className="profile-name">
                                {loggedInUser.name}
                            </span>
                            {/* logout */}

                            <button className="logout-btn" onClick={() => {
                                localStorage.removeItem('user');
                                window.location.href = '/login';
                            }}>
                                <LogoutIcon />
                                Logout</button>
                        </div>
                    </header>
                    <div className="content">
                        <h2>Users</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Date Created</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <Avatar alt={user.name} src={user.image} style={{ marginRight: '10px' }} />
                                            {user.name}
                                        </td>
                                        <td>{user.dateCreated}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Badge
                                                variant="dot"
                                                color={getStatusColor(user.status)}
                                                style={{ color: getStatusColor(user.status) }}
                                            >
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <IconButton>
                                                <SettingsIcon />
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;