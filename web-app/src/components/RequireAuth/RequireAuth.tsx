import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../../domains/users/useMe/useMe.ts";

export default function RequireAuth() {
    const { data: me, isLoading } = useMe();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!me) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}