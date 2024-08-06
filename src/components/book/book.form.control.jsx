import { Input } from 'antd';
import { Button, Flex, notification, Modal, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { createBookApi } from '../../service/api.service';
import { handleUploadFile } from '../../service/api.service';

const BookFormControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const handleSubmitBtn = async () => {

        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload a thumbnail"
            })
            return
        }
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {

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
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
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
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"CREATE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Title</span>
                    <Input

                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
                    />
                </div>
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <span>Price</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonAfter={"VND"}
                        value={price}
                        onChange={(event) => setPrice(event)}
                    />
                </div>
                <div>
                    <span>Quantity</span>
                    <br />
                    <InputNumber
                        style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => setQuantity(event)}
                    />
                </div>
                <div>
                    <span>Category</span>
                    <Select
                        style={{ width: "100%" }}
                        defaultValue="Arts"
                        value={category}
                        onChange={(event) => setCategory(event)}
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
                </div>

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
                        onClick={(event) => { event.target.value = null }} />
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
            </div>
        </Modal>

    )
}

export default BookFormControl