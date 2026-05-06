import {Outlet} from "react-router-dom";
import "./RootLayout.css";
import {NavBar} from "../../components/NavBar/NavBar.tsx";
import {ChatProvider} from "../../components/Chat/components/ChatProvider.tsx";

export default function RootLayout() {
    const userId = localStorage.getItem("userId") || "";

    return (
        <ChatProvider currentUserId={userId}>
            <header className="header">
                <NavBar
                    isAuthenticated={Boolean(userId.trim())}
                    currentUserId={userId}
                />
            </header>

            <main className="main-container">
                <Outlet/>
            </main>
        </ChatProvider>
    );
}