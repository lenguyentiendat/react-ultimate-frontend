import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, message } from "antd";
import {
    UserAddOutlined, HomeOutlined,
    AuditOutlined, SettingOutlined,
    LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../service/api.service";

const Header = () => {

    const [current, setCurrent] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(">>CHECK DATA ", user)

    useEffect(() => {
        console.log(">>>check location", location)
        if (location && location.pathname) {
            const allRoutes = ["users", "books"]
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }
    }, [location])

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogOut = async () => {
        const res = await logoutApi()
        if (res.data) {
            localStorage.removeItem("access_token")

            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout successfully")
            //redirect to home
            navigate("/")
        }
    }
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,
        },

        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),


        ...user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'settings',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={handleLogOut}>Log out</span>,
                    key: "logout",
                },

            ],
        }] : [],



    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Header;