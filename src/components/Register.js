import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Register() {
    const [formData, setFormData] = useState({ name: '', dob: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://us-central1-chain-m.cloudfunctions.net/demoApi/register', formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
            toast.success('Registration successful!');
        } catch (error) {
            toast.error(error.response.data.error || 'Registration failed. Please try again.'); // Add toast error message
        }
    };

    return (
        <div style={{
            backgroundColor: '#008d95',
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Container style={{
                backgroundColor: '#14254f',
                width: 400,
                height: 'auto',
                position: 'relative',
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 40,
                paddingRight: 40,
                borderRadius: 5,
            }}>
                <div className='page_name_header'>Register</div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                }}>
                    <AccountCircleIcon style={{
                        fontSize: 100,
                        color: '#858ba4',
                    }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='input_container'>
                        <PersonIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='text' name='name' placeholder='Name' onChange={handleChange} />
                    </div>

                    <div className='input_container'>
                        <CalendarTodayIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='date' name='dob' placeholder='Date of Birth' onChange={handleChange} />
                    </div>

                    <div className='input_container'>
                        <PersonIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='text' name='email' placeholder='Email' onChange={handleChange} />
                    </div>

                    <div className='input_container'>
                        <HttpsIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='password' name='password' placeholder='Password' onChange={handleChange} />
                    </div>

                    <div className='login_button_container'>
                        <button type="submit">Register</button>
                    </div>
                </form>

                <div className='login_link'>
                    <a href='/login'>
                        Already have an account? Login now
                    </a>
                </div>
            </Container>
        </div>
    );
}

export default Register;