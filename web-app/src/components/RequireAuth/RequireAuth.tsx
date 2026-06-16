import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../../domains/users/useMe/useMe.ts";
import {LOGIN_PATH} from "../../constants/paths.ts";

export default function RequireAuth() {
    const { data: me, isLoading } = useMe();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!me) {
        return <Navigate to={LOGIN_PATH} replace />;
    }

    return <Outlet />;
}