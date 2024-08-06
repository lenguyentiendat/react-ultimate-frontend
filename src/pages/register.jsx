import { Input, Button, Flex, notification, Modal, Form } from 'antd';
import { useState } from 'react';
import { registerUserApi } from '../service/api.service';
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Divider } from 'antd';

const RegisterPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log(">>CHECK VALUES ", values)
        const res = await registerUserApi(values.fullName, values.email, values.password, values.phone)

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Login succesfully"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register failed",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            form={form}
            layout='vertical'
            name="basic"

            onFinish={onFinish}
            // onFinishFailed={onFinishFailed} 
            autoComplete="off"
            style={{ margin: "30px" }}
        >
            <h3 style={{ textAlign: "center" }}>Register an account</h3>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Col>
            </Row>



            { /* <button type="submit">Register</button> */}
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={() => form.submit()}
                            type="primary">Register</Button>

                        {/* <Button onClick={() => {
                                        form.setFieldsValue({
                                            email: "datlnt@gmail.com",
                                            phone: "038123231231",

                                            fullName: "DatLNT"
                                        })

                                        console.log(">>>Check form", form.getFieldsValue())
                                        // form.getFieldsValue()
                                    }}>Test</Button> */}
                    </div>
                    <Divider />
                    <div>Already have one ?</div><Link to="/login">Login here</Link>
                </Col>
            </Row>

        </Form >
    )
}

export default RegisterPage 