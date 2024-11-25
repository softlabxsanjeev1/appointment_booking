import { Button, Form, Input } from 'antd'
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("http://localhost:8000/api/user/login", values);
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to Home page");
                // console.log(response.data)
                localStorage.setItem("token", response.data.token); // Store user data
                navigate("/")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Nice to Meet You</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='password' type='password' />
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>
                    <Link to='/register' className='anchor'>CLICK HERE TO REGISTER</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login