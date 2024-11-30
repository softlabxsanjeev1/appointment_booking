import React from 'react'
import Layout from '../components/Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import axios from "axios";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useNavigate } from 'react-router-dom';

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("http://localhost:8000/api/user/apply-doctor-account", {
                ...values, userId: user._id,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <h1 className='page-title mt-3'>Apply Doctor</h1>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
                <h1 className='card-title mt-3'>Personal Information</h1>
                <Row>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="First name" name='firstName' rules={[{ required: true }]}>
                            <Input placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Last name" name='lastName' rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Phone no" name='phoneNumber' rules={[{ required: true }]}>
                            <Input placeholder='phone no' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Website" name='website' rules={[{ required: true }]}>
                            <Input placeholder='your website link' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Address" name='address' rules={[{ required: true }]}>
                            <Input placeholder='Enter your full address' />
                        </Form.Item>
                    </Col>

                </Row>
                <hr />
                <h1 className='card-title mt-3'>Professional Information</h1>
                <Row>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Specialization" name='specialization' rules={[{ required: true }]}>
                            <Input placeholder='Specialization' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Experience" name='experience' rules={[{ required: true }]}>
                            <Input placeholder='Enter your experience' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Fee per consultation" name='feePerConsultation' rules={[{ required: true }]}>
                            <Input placeholder='Fees per consultation' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item rerquired label="Timings" name='timings' rules={[{ required: true }]}>
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor