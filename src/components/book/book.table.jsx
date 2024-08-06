import { useEffect, useState } from "react"
import { fetchAllBookApi, deleteBookApi } from "../../service/api.service"
import { Table, Popconfirm, notification, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BookDetail from "./book.detail";
import BookFormControl from "./book.form.control";
import BookFormUncontrol from "./book.form.uncontrol";
import BookUpdateControl from "./book.update.control";
import BookUpdateUncontrol from "./book.update.uncontrol";

const BookTable = () => {

    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetails, setDataDetails] = useState(null)
    const [isDataDetailsOpen, setIsDataDetailsOpen] = useState(false)

    const [isCreateOpen, setIsCreateOpen] = useState(false)

    const [loadingTable, setLoadingTable] = useState(false)

    useEffect(() => {
        loadBook()
    }, [current, pageSize])

    const loadBook = async () => {
        setLoadingTable(true)
        const res = await fetchAllBookApi(current, pageSize)
        if (res.data) {
            setDataBook(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)


    }

    const handleDeleteBook = async (id) => {
        const res = await deleteBookApi(id)
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Delete book successfully"
            })
            await loadBook()
        } else {
            notification.error({
                message: "Delete Book fail",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        //setCurrent, setPageSize
        //neu thay doi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)

            }
        }

        //neu thay doi tong so phan tu: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
        console.log('params: ', { pagination, filters, sorter, extra });
    }

    const columns = [
        {
            title: "Number",
            dataIndex: "index",
            render: (_, record, index) => {
                console.log(">>>check index", index)
                // const number = (index + 1) + (current - 1) * pageSize
                // console.log(">>>check number", number)
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setDataDetails(record)
                            setIsDataDetailsOpen(true)
                        }
                        }>{record._id}
                    </a>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (money) => {
                if (money) {
                    return new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 2
                    }).format(money)
                }
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            // 
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "black" }} />
                    <Popconfirm
                        title="Delete Book"
                        description="Are you sure to delete this book?"
                        onConfirm={() => { handleDeleteBook(record._id) }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];
    return (
        <>
            <div style={{
                margin: "10px 0",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>



            <Table
                dataSource={dataBook}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}

            />;

            <BookDetail
                dataDetails={dataDetails}
                setDataDetails={setDataDetails}
                isDataDetailsOpen={isDataDetailsOpen}
                setIsDataDetailsOpen={setIsDataDetailsOpen}
                loadBook={loadBook}
            />
            {/* <BookFormControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            /> */}
            <BookFormUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}

            />
            {/* <BookUpdateControl
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            /> */}

            <BookUpdateUncontrol
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            />



        </>


    )



}

export default BookTable