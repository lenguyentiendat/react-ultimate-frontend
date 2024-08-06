import { useState, useEffect } from "react"
import { Button, Drawer, notification } from "antd"
import { handleUploadFile, updateUserAvatarApi } from "../../service/api.service"
import { updateBookThumbnailApi } from "../../service/api.service"

const BookDetail = (props) => {
    const { dataDetails,
        setDataDetails,
        isDataDetailsOpen,
        setIsDataDetailsOpen,
        loadBook
    } = props



    // const handleUpdateBookAvatar = async () => {
    //     //step1: upload file
    //     const resUpload = await handleUploadFile(selectedFile, "thumbnail")
    //     if (resUpload.data) {

    //         const thumbnail = resUpload.data.fileUploaded
    //         //step 2: update user
    //         const resUpdateAvatar = await updateBookThumbnailApi(thumbnail, dataDetails._id, dataDetails.mainText, dataDetails.author, dataDetails.category, dataDetails.price)
    //         if (resUpdateAvatar.data) {
    //             setIsDataDetailsOpen(false)
    //             setSelectedFile(null)
    //             setPreview(null)
    //             await loadBook()

    //             notification.success({
    //                 message: "Update user avatar",
    //                 description: "Update user avatar successfully"
    //             })
    //         } else {
    //             notification.error({
    //                 message: "Upload failed",
    //                 description: JSON.stringify(resUpdateAvatar.message)
    //             })
    //         }

    //     }
    //     else {
    //         notification.error({
    //             message: "Upload failed",
    //             description: JSON.stringify(resUpload.message)
    //         })

    //     }
    //     console.log(">>>check resUpload", resUpload)
    //     //step 2: update user
    // }

    // const handleOnChangeFile = (event) => {
    //     if (!event.target.files || event.target.files.length === 0) {
    //         setSelectedFile(null)
    //         setPreview(null)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     const file = event.target.files[0]
    //     if (file) {
    //         setSelectedFile(file)
    //         setPreview(URL.createObjectURL(file))
    //     }

    // }
    return (
        <Drawer
            width={"40vw"}
            title="Books Details"
            onClose={() => {
                setIsDataDetailsOpen(false)
                setDataDetails(null)
            }}
            open={isDataDetailsOpen}
        >

            {dataDetails ? <>
                <div>
                    <p>ID: {dataDetails._id}</p>
                </div>
                <br />

                <div>
                    <p>Title: {dataDetails.mainText}</p>
                </div>
                <br />

                <div>
                    <p>Author: {dataDetails.author}</p>
                </div>
                <br />

                <div>
                    <p>Category: {dataDetails.category}</p>
                </div>
                <br />
                <div>
                    <p>Price: {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 2
                    }).format(dataDetails.price)}
                    </p>
                </div>
                <br />
                <p> Thumbnail: </p>
                <div style={{
                    marginTop: "10px",
                    height: "100px",
                    width: "150px",
                    border: "1px solid #ccc"
                }}>
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetails.thumbnail}`} />
                </div>

            </>
                :
                <>

                    <p>No data</p>
                </>
            }
        </Drawer >
    )
}

export default BookDetail