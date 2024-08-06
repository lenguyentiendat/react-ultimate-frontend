import FormUser from "../components/users/form.user"
import TableUsers from "../components/users/table.user"
import { fetchAllUserAPI } from "../service/api.service"
import { useEffect, useState } from "react"


const UsersPage = () => {

    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    //Ko nen dung async await trog useEffect
    // not empty => next value != prev value
    useEffect(() => { //side effect
        // console.log(">>> run useEffect 11111")
        loadUser()
    }, [current, pageSize]) //[] + condition

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }

    }
    // console.log(">>>check current: ", current, pageSize)

    //Lift up state
    return (
        <div style={{ padding: "20px" }}>
            <FormUser loadUser={loadUser} />
            <TableUsers
                loadUser={loadUser}
                dataUsers={dataUsers}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default UsersPage    