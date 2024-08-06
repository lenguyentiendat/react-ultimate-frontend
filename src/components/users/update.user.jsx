import { useEffect, useState } from "react"
import { Button, Flex, notification, Modal, Input } from 'antd';
import { createUserApi, updateUserApi } from "../../service/api.service";

const UpdateUser = (props) => {

    const [fullName, setFullName] = useState("")
    const [id, setId] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props


    //next dataUpdate != prev dataUpdate
    useEffect(() => {
        console.log(">>>check dataUpdate props: ", dataUpdate)
        if (dataUpdate) {
            setFullName(dataUpdate.fullName)
            setId(dataUpdate._id)
            // setPassword("")
            setPhoneNumber(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        const res = await updateUserApi(id, fullName, phoneNumber)
        // console.log(">>>check res", res)
        if (res.data) {
            notification.success({
                message: "Update users",
                description: "Update users successfully"
            })
            resetAndCloseModal()
            await loadUser()
        }
    }
    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setFullName("")
        setId("")
        setPhoneNumber("")
        setDataUpdate(null)
    }


    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>

                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        // onChange={(event) => setEmail(event.target.value)}
                        disabled
                    />
                </div>

                <div>
                    <span>Full Name</span>
                    <Input

                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
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
    )

}
export default UpdateUser