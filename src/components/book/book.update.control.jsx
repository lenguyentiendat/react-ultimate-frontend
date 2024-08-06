import { useState, useEffect } from "react";
import { Modal, Input, InputNumber, Select, notification } from "antd";
import { updateBookApi } from "../../service/api.service";
import { handleUploadFile } from "../../service/api.service";

const BookUpdateControl = (props) => {
    const [id, setId] = useState("");

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { dataUpdate, setDataUpdate, isModalUpdateOpen,
        setIsModalUpdateOpen, loadBook } = props

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])
    console.log(">>>Check dataUpdate", dataUpdate)

    const updateBook = async (thumbnail) => {
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
    const handleUpdateBtn = async () => {
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
        await updateBook(thumbnail)
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
        setIsModalUpdateOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
        setDataUpdate(null)
    }
    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => handleUpdateBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"UPDATE"}
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

                        />
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

            </div>
        </Modal >
    )
}

export default BookUpdateControl;