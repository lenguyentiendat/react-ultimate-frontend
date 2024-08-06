import { Form, Input, Button, Select, Spin, Modal, notification, InputNumber } from 'antd';
import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { handleUploadFile } from '../../service/api.service'
import { createBookApi } from '../../service/api.service';

const BookFormUncontrol = (props) => {
    const [form] = Form.useForm()
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { isCreateOpen, setIsCreateOpen, loadBook } = props


    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleSubmitBtn = async (values) => {

        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload a thumbnail"
            })
            return
        }
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            const { mainText, author, price, quantity, category } = values
            console.log(">>>Check values: ", values)

            const thumbnail = resUpload.data.fileUploaded
            //step 2: update user
            const resUpdateBook = await createBookApi(thumbnail, mainText, author, price, quantity, category)
            if (resUpdateBook.data) {
                resetAndCloseModal()
                await loadBook()

                notification.success({
                    message: "Create book",
                    description: "Create book successfully"
                })
            } else {
                notification.error({
                    message: "Error Create book",
                    description: JSON.stringify(resUpdateBook.message)
                })
            }
        }
    }

    const resetAndCloseModal = () => {
        form.resetFields()
        setPreview(null)
        setSelectedFile(null)
        setIsCreateOpen(false)
    }


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }

    }

    return (
        <Modal
            title="Create Book"
            open={isCreateOpen}
            // okButtonProps={{ loading: true }}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"CREATE"}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Form
                    form={form}
                    layout='vertical'
                    name="basic"

                    onFinish={handleSubmitBtn}
                    // onFinishFailed={onFinishFailed} 
                    autoComplete="off"
                    style={{ margin: "10px" }}
                >


                    <Form.Item
                        style={{ width: "100%" }}
                        label="Title"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input author!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={"VND"}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input quantity!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        style={{ display: "100%" }}
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input category!',
                            },

                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>



                    { /* <button type="submit">Register</button> */}


                    <div>
                        <span>Thumbnail</span>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload Thumbnail
                        </label>
                        <input
                            type="file"
                            hidden
                            id="btnUpload"
                            onChange={(event) => handleOnChangeFile(event)}
                            onClick={(event) => { event.target.value = null }}
                            style={{ display: "none" }} />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "150px",
                                marginBottom: "15px"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        </>
                    }

                </Form >
            </div>
        </Modal >

    )
}
export default BookFormUncontrol