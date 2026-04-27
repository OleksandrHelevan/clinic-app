
import './Loader.css';

interface LoaderProps {
    text?: string;
}

export const Loader = ({ text = "Loading..." }: LoaderProps) => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};