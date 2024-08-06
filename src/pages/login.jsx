import { Button, Form, Input, Row, Col, Divider, message, notification } from "antd";
import { loginApi, registerUserApi } from '../service/api.service';
import { useNavigate, Link } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const { user, setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        // console.log(">>CHECK VALUES ", values)
        setLoading(true)

        const res = await loginApi(values.email, values.password)
        console.log(">>>Check res", res)
        if (res.data) {
            message.success("Login successfully")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)

            })

        }
        setLoading(false)
    }

    return (

        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}>
                    <legend style={{ fontSize: "15px" }}>Login</legend>
                    <Form
                        form={form}
                        layout='vertical'
                        name="basic"

                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed} 
                        autoComplete="off"
                        style={{ margin: "30px" }}
                    >


                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: "email",
                                    message: "Email is not valid"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



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
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') form.submit()
                            }} />
                        </Form.Item>



                        { /* <button type="submit">Register</button> */}

                        <Form.Item >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <Button
                                    loading={loading}
                                    onClick={() => form.submit()}
                                    type="primary">Login</Button>

                                {/* <Button onClick={() => {
                                        form.setFieldsValue({
                                            email: "datlnt@gmail.com",
                                            phone: "038123231231",

                                            fullName: "DatLNT"
                                        })

                                        console.log(">>>Check form", form.getFieldsValue())
                                        // form.getFieldsValue()
                                    }}>Test</Button> */}



                                <Link style={{ float: "right" }} to='/' >Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>



                    </Form >
                    <Divider />
                    <div style={{ textAlign: "center" }}>Do not have an account?<Link to={"/register"}>Register here</Link></div>
                </fieldset>
            </Col >
        </Row >
    )
}

export default LoginPage    