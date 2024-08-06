import { Form, Input, Button, Select, Spin, Modal, notification, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { handleUploadFile } from '../../service/api.service'
import { createBookApi, updateBookApi } from '../../service/api.service';

const BookUpdateUncontrol = (props) => {
    const [form] = Form.useForm()
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { dataUpdate, setDataUpdate, isModalUpdateOpen,
        setIsModalUpdateOpen, loadBook } = props


    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])
    // console.log(">>>Check dataUpdate", dataUpdate)

    const updateBook = async (thumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const res = await updateBookApi(id, thumbnail, mainText, author, price, quantity, category)
        if (res.data) {
            notification.success({
                message: "Update book",
                description: "Update book successfully"
            })
            resetAndCloseModal()
            await loadBook()
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            })
        }
    }
    const handleSubmitBtn = async (values) => {

        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload a thumbnail"
            })
            return
        }

        let thumbnail = ''
        if (!selectedFile && preview) {
            thumbnail = dataUpdate.thumbnail
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book")
            if (resUpload.data) {

                thumbnail = resUpload.data.fileUploaded

            } else {
                notification.error({
                    message: "Error Upload thumbnail",
                    description: JSON.stringify(resUpload.message)
                })
                return
            }
        }
        //Update book
        await updateBook(thumbnail, values)
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

    const resetAndCloseModal = () => {
        form.resetFields()
        setPreview(null)
        setSelectedFile(null)
        setIsModalUpdateOpen(false)
    }




    return (
        <Modal
            title="Create Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"UPDATE"}
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
                        label="ID"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

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
export default BookUpdateUncontrol