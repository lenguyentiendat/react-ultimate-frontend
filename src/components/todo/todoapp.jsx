import "./todo.css"
import TodoData from "./tododata"
import TodoNew from "./todonew"
import reactLogo from "../../assets/react.svg"
import { useState } from "react"

const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React" },
        // { id: 2, name: "Watching Youtube" },
    ])

    // const datLNT = "DatLNT The Blues"
    // const age = 22
    // const data = {
    //   address: "HCM city",
    //   country: "Vietnam"
    // }
    const handleDeleteClick = (id) => {
        const removeItem = todoList.filter(todo => todo.id !== id)
        setTodoList(removeItem)
        // console.log(">>>Check id: ", id)
    }
    const addNewTodo = (name) => {
        const newTodo = {
            id: rndInt,
            name: name
        }

        setTodoList([...todoList, newTodo]) // 

        //array.push()
        // todoList.push(newTodo)
        // setTodoList(todoList)


    }
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const rndInt = randomIntFromInterval(1, 1000000);

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodoFunc={addNewTodo}
            />

            {todoList.length > 0 ?
                < TodoData
                    todoList={todoList}
                    handleDeleteClick={handleDeleteClick}
                />
                :
                <div className="todo-img">
                    <img src={reactLogo} className="logo" alt="React logo" />
                </div>
            }

        </div>
    )

}
export default TodoApp
