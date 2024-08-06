import "./components/todo/todo.css"
import TodoData from "./components/todo/tododata"
import TodoNew from "./components/todo/todonew"
import reactLogo from "./assets/react.svg"
import { useEffect, useState } from "react"
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import { Outlet } from "react-router-dom"
import { getAccountApi } from "./service/api.service"
import { AuthContext } from "./components/context/auth.context"
import { useContext } from "react"
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo()
  }, [])

  // const delay = (milSeconds) => {
  //   return (new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milSeconds)
  //   })
  //   )
  // }

  const fetchUserInfo = async () => {
    const res = await getAccountApi()
    if (res.data) {
      //success
      setUser(res.data.user)
      console.log(">>>check res", res.data)
    }
    setIsAppLoading(false)
  }
  return (
    <>
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>

      }

    </>
  )
}

export default App
