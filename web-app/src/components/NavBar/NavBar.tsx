import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/Logo.tsx";
import { Avatar } from "../../assets/Avatar.tsx";
import "./NavBar.css";
import { ChatIcon } from "../../assets/ChatIcon.tsx";
import { DOCTORS_PATH, LOGIN_PATH, ME_PATH } from "../../constants/paths.ts";
import {useChatGlobal} from "../Chat/components/ChatContext.tsx"; // Перевірте правильність шляху до компонента Chat

interface NavBarProps {
    isAuthenticated?: boolean;
    currentUserId?: string;
}

export function NavBar({ isAuthenticated = false }: NavBarProps) {
    const { openChat } = useChatGlobal()
    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" className="logo-link">
                        <Logo height={40} width={40} />
                    </Link>
                </div>

                <ul className="navbar-links">
                    <li><NavLink to={DOCTORS_PATH}>Doctors</NavLink></li>
                </ul>

                <div className="navbar-right">
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => openChat()}
                                className="chat-nav-btn"
                                aria-label="Open chat"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                            >
                                <ChatIcon height={32} width={32} />
                            </button>

                            <Link to={ME_PATH} className="avatar-link">
                                <Avatar height={32} width={32} />
                            </Link>
                        </>
                    ) : (
                        <Link to={LOGIN_PATH} className="login-btn">
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}