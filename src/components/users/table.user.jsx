import { Table, Popconfirm, notification } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUser from './update.user';
import { deleteUserApi } from '../../service/api.service';
import ViewUserDetail from './view.user.detail';


const TableUsers = (props) => {
    const { dataUsers, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize
    } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetails, setDataDetails] = useState(null)
    const [isDataDetailsOpen, setIsDataDetailsOpen] = useState(false)

    const [loadingTable, setLoadingTable] = useState(false)



    const handleDeleteUser = async (id) => {
        const res = await deleteUserApi(id)
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete user successfully"
            })
            await loadUser()
        } else {
            notification.error({
                message: "Delete User fail",
                description: JSON.stringify(res.message)
            })
        }
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
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
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
                        style={{ cursor: "pointer", color: "blue" }} />
                    <Popconfirm
                        title="Delete User"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { handleDeleteUser(record._id) }}
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
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
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
            // loading={loadingTable}
            />
            <UpdateUser
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetails={dataDetails}
                setDataDetails={setDataDetails}
                isDataDetailsOpen={isDataDetailsOpen}
                setIsDataDetailsOpen={setIsDataDetailsOpen}
                loadUser={loadUser}

            />
        </>

    )
}
export default TableUsers;  