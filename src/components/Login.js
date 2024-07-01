import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {

        console.log();
        e.preventDefault();
        try {
            const response = await axios.post('https://us-central1-chain-m.cloudfunctions.net/demoApi/login', formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
            toast.success('Login successful!');
        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error || 'Login failed. Please try again.'); // Add toast error message
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
                <div className='page_name_header'>Sign in</div>

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

                <form
                    onSubmit={handleSubmit}
                >
                    <div className='input_container'>
                        <PersonIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='text' name='email' placeholder='username' onChange={handleChange} />
                    </div>

                    <div className='input_container'>
                        <HttpsIcon style={{
                            color: '#858ba4',
                        }} />
                        <div className='vertical_line'></div>
                        <input type='password' name='password' placeholder='password' onChange={handleChange} />
                    </div>

                    <div className='remember_forgot_container'>
                        <div className='remember_me'>
                            <input type='checkbox' name='remember_me' />
                            <label>Remember me</label>
                        </div>
                        <div className='forgot_password'>
                            <a href='#'>Forgot password?</a>
                        </div>
                    </div>

                    <div className='login_button_container'>
                        <button type="submit">Login</button>
                    </div>
                </form>

                <div className='register_link'>
                    <a href='/register'>
                        Don't have an account? Register now
                    </a>
                </div>


            </Container>

        </div>
    );
}

export default Login;