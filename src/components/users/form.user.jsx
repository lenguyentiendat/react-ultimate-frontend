import { Input } from 'antd';
import { Button, Flex, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserApi } from '../../service/api.service';


const FormUser = (props) => {
    // console.log(">>>check props", props)
    const { loadUser } = props

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleSubmitBtn = async () => {
        const res = await createUserApi(fullName, email, password, phoneNumber)
        // console.log(">>>check res", res)
        if (res.data) {
            notification.success({
                message: "Create users",
                description: "Create users successfully"
            })
            resetAndCloseModal()
            await loadUser()
        }
    }
    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        setFullName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")

    }

    // console.log(">>>check informations", fullName, email, password, phoneNumber)

    return (
        <div className='user-form' style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    // onClick={handleClickBtn}
                    onClick={() => setIsModalOpen(true)}
                    type="primary">Create User
                </Button>
            </div>

            <Modal
                title="Create Users"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input

                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div >
    )
}
export default FormUser