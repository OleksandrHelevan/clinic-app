import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import './HomePage.css'

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src={"src/assets/logo.png"} alt="logo" />
            <h1 className="header-text">Ласкаво просимо в Avyro</h1>
            <div className="home-actions">
                <Button variant="primary" onClick={() => navigate('/login')} className={"login-button"}>
                    Увійти
                </Button>
            </div>
        </div>
    )

}