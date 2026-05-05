import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/Logo.tsx";
import { Avatar } from "../../assets/Avatar.tsx";
import "./NavBar.css";
import {ChatIcon} from "../../assets/ChatIcon.tsx";
import {DOCTORS_PATH, LOGIN_PATH, ME_PATH} from "../../constants/paths.ts";

interface NavBarProps {
    isAuthenticated?: boolean;
}

export function NavBar({ isAuthenticated = false }: NavBarProps) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="logo-link">
                    <Logo height={40} width={40} />
                </Link>
            </div>

            <ul className="navbar-links">
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/appointments">Appointments</NavLink></li>
                <li><NavLink to={DOCTORS_PATH}>Doctors</NavLink></li>
                <li><NavLink to="/records">Records</NavLink></li>
            </ul>

            <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <ChatIcon height={32} width={32} />
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
    );
}