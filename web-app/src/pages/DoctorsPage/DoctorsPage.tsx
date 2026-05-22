import type {Specialization, UserResponse} from "../../domains/doctors/types.ts";
import {useGetDoctors} from "../../domains/doctors/useGetDoctors/useGetDoctors.ts";
import {DoctorCard} from "./components/DoctorCard.tsx";
import {ALL_SPECIALIZATIONS} from "../../domains/doctors/contants.ts";
import {getFromStorage} from "../../utils/localStorageUtil.ts";
import {Loader} from "../../components/Loader/Loader.tsx";
import './DoctorsPage.css';
import {useState} from "react";
import {useChatGlobal} from "../../components/Chat/context/ChatContext.tsx";

export const DoctorsPage = () => {
    const [selectedSpec, setSelectedSpec] = useState<Specialization | undefined>(undefined);
    const [page, setPage] = useState(0);

    const {openChat} = useChatGlobal();

    const {data, isLoading, isError, isPlaceholderData} = useGetDoctors(selectedSpec, page);

    const currentUserId = getFromStorage<string>("userId") || "";

    const handleWriteMessage = (doctor: UserResponse) => {
        if (!currentUserId) {
            alert("Please log in to start a chat.");
            return;
        }
        openChat({
            id: doctor.id,
            firstName: doctor.firstName || " ",
            lastName: doctor.lastName || " "
        });
    };

    return (
        <div className="doctors-layout">
            <aside className="doctors-sidebar">
                <h3 className="sidebar-title">Specializations</h3>
                <nav className="sidebar-nav">
                    {ALL_SPECIALIZATIONS.map(spec => (
                        <button
                            key={spec}
                            onClick={() => {
                                setSelectedSpec(spec);
                                setPage(0);
                            }}
                            className={`spec-btn ${selectedSpec === spec ? 'active' : ''}`}
                        >
                            {spec.charAt(0) + spec.slice(1).toLowerCase()}
                        </button>
                    ))}

                    {selectedSpec && (
                        <button
                            onClick={() => {
                                setSelectedSpec(undefined);
                                setPage(0);
                            }}
                            className="reset-btn"
                        >
                            Reset filter
                        </button>
                    )}
                </nav>
            </aside>

            <main className="doctors-main">
                <header className="main-header">
                    <h1>Our Specialists</h1>
                    {selectedSpec && (
                        <p className="subtitle">
                            Results for category: <strong>{selectedSpec}</strong>
                        </p>
                    )}
                </header>

                {!selectedSpec && !isLoading && (
                    <div className="empty-state">
                        <h2>Welcome!</h2>
                        <p>Please select a specialization from the left menu to view available doctors.</p>
                    </div>
                )}

                {isLoading && <Loader/>}
                {isError && <p className="error-text">Error loading doctors. Please try again later.</p>}

                <div className={`doctors-grid ${isPlaceholderData ? 'loading' : ''}`}>
                    {data?.content.map(doctor => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onWriteMessage={handleWriteMessage}
                        />
                    ))}
                </div>

                {data && data.totalPages > 1 && (
                    <footer className="pagination-wrapper">
                        <button
                            disabled={page === 0 || isPlaceholderData}
                            onClick={() => setPage(prev => prev - 1)}
                            className="pagination-btn"
                        >
                            ← Previous
                        </button>

                        <span className="pagination-info">
                            Page {page + 1} of {data.totalPages}
                        </span>

                        <button
                            disabled={page >= data.totalPages - 1 || isPlaceholderData}
                            onClick={() => setPage(prev => prev + 1)}
                            className="pagination-btn"
                        >
                            Next →
                        </button>
                    </footer>
                )}
            </main>
        </div>
    );
};