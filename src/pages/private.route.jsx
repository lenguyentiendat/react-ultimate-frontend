import { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { Navigate, Link } from 'react-router-dom';
import { Result, Button } from 'antd';
const PrivateRoute = (props) => {
    const { user, setUser } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <div >
            <Result
                status="403"
                title="Unauthorized"
                subTitle="You need to login to access this page"
                extra={<Button type="primary">
                    <Link to="/">
                        <span >Back to Homepage</span>
                    </Link>
                </Button>}
            />
        </div >
    )
}

export default PrivateRoute