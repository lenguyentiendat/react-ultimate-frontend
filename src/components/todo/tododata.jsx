const TodoData = (props) => {
    //props là 1 object
    // {
    //     name: "ERIC",
    //     age: 25,
    //     data: {}
    // }

    const { todoList, handleDeleteClick } = props
    // const name = props.name
    // const age = props.age
    // const data = props.data


    const handleClick = (id) => {
        handleDeleteClick(id)
        // alert(id)
    }
    console.log(">>>props: ", props.todoList)
    return (
        <div className="title-below">
            {todoList.map((item, index) => {
                // console.log(">>> check map ", item, index)
                return (
                    <div className={`todo-item`} key={item.id} >
                        <div>{item.name}</div>
                        <button
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick(item.id)}>
                            Delete
                        </button>
                    </div>
                )
            })}

        </div>
    )
}
export default TodoData
