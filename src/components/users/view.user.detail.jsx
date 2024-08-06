import { Button, Drawer, notification } from "antd"
import { useState, useEffect } from "react"
import { handleUploadFile, updateUserAvatarApi } from "../../service/api.service"


const ViewUserDetail = (props) => {
    const { dataDetails,
        setDataDetails,
        isDataDetailsOpen,
        setIsDataDetailsOpen,
        loadUser
    } = props

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [fullName, setFullName] = useState("")
    const [id, setId] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    // useEffect(() => {
    //     console.log(">>>check dataDetails props: ", dataDetails)
    //     if (dataDetails) {
    //         setFullName(dataDetails.fullName)
    //         setId(dataDetails._id)
    //         setEmail(dataDetails.email)
    //         setPhoneNumber(dataDetails.phone)
    //     }
    // }, [dataDetails])
    // console.log(">>>Check data details: ", dataDetails)
    const handleUpdateUserAvatar = async () => {
        //step1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {

            const avatar = resUpload.data.fileUploaded
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarApi(avatar, dataDetails._id, dataDetails.fullName, dataDetails.phone)
            if (resUpdateAvatar.data) {
                setIsDataDetailsOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()

                notification.success({
                    message: "Update user avatar",
                    description: "Update user avatar successfully"
                })
            } else {
                notification.error({
                    message: "Upload failed",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        }
        else {
            notification.error({
                message: "Upload failed",
                description: JSON.stringify(resUpload.message)
            })

        }
        console.log(">>>check resUpload", resUpload)
        //step 2: update user
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
    console.log(">>>CHECK FILE:", preview)
    return (
        <Drawer
            width={"40vw"}
            title="User Details"
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
                    <p>Full name: {dataDetails.fullName}</p>
                </div>
                <br />

                <div>
                    <p>Phone Number: {dataDetails.phone}</p>
                </div>
                <br />

                <div>
                    <p>Email: {dataDetails.email}</p>
                </div>
                <br />
                <p> Avatar: </p>
                <div style={{
                    marginTop: "10px",
                    height: "100px",
                    width: "150px",
                    border: "1px solid #ccc"
                }}>
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetails.avatar}`} />
                </div>
                <div>
                    <label htmlFor="btnUpload" style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        padding: "10px",
                        background: "orange",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Upload Avatar
                    </label>
                    <input
                        type="file"
                        hidden
                        id="btnUpload"
                        onChange={handleOnChangeFile} />
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
                        <Button
                            type="primary"
                            onClick={handleUpdateUserAvatar}>Save</Button>
                    </>
                }



            </>
                :
                <>

                    <p>No data</p>
                </>
            }
        </Drawer >
    )
}
export default ViewUserDetail