import { Outlet } from "react-router-dom";
import "./RootLayout.css";
import { NavBar } from "../../components/NavBar/NavBar.tsx";

export default function RootLayout() {
    return (
        <>
            <header className="header">
                <NavBar isAuthenticated={true} />
            </header>

            <main className="main-container">
                <Outlet />
            </main>
        </>
    );
}