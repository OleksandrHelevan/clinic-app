import React, { useState } from 'react';
import type { Specialization, DoctorResponse } from "../../domains/doctors/types.ts";
import { useGetDoctors } from "../../domains/doctors/useGetDoctors/useGetDoctors.ts";
import { DoctorCard } from "./components/DoctorCard.tsx";
import { ALL_SPECIALIZATIONS } from "../../domains/doctors/contants.ts";
import { Chat } from "../../components/Chat/Chat.tsx";
import { getFromStorage } from "../../utils/localStorageUtil.ts";

export const DoctorsPage: React.FC = () => {
    const [selectedSpec, setSelectedSpec] = useState<Specialization | undefined>(undefined);
    const [page, setPage] = useState(0);

    const [activeChatDoctor, setActiveChatDoctor] = useState<DoctorResponse | null>(null);

    const { data, isLoading, isError, isPlaceholderData } = useGetDoctors(selectedSpec, page);

    const currentUserId = getFromStorage<string>("userId") || "";

    // Обробник натискання на кнопку "Написати"
    const handleWriteMessage = (doctor: DoctorResponse) => {
        if (!currentUserId) {
            alert("Будь ласка, увійдіть в систему, щоб почати чат.");
            return;
        }
        setActiveChatDoctor(doctor);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

            {/* Sidebar з вибором спеціалізації */}
            <aside style={sidebarStyle}>
                <h3 style={{ marginBottom: '20px' }}>Спеціалізації</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ALL_SPECIALIZATIONS.map(spec => (
                        <button
                            key={spec}
                            onClick={() => {
                                setSelectedSpec(spec);
                                setPage(0); // Скидаємо на першу сторінку при зміні фільтра
                            }}
                            style={{
                                ...navButtonStyle,
                                backgroundColor: selectedSpec === spec ? '#007bff' : 'transparent',
                                color: selectedSpec === spec ? 'white' : '#333',
                                fontWeight: selectedSpec === spec ? 'bold' : 'normal',
                            }}
                        >
                            {spec.charAt(0) + spec.slice(1).toLowerCase()}
                        </button>
                    ))}
                    <button
                        onClick={() => { setSelectedSpec(undefined); setPage(0); }}
                        style={resetButtonStyle}
                    >
                        Скинути фільтр
                    </button>
                </nav>
            </aside>

            {/* Основна частина з картками лікарів */}
            <main style={{ flex: 1, padding: '30px', backgroundColor: '#fff' }}>
                <header style={{ marginBottom: '30px' }}>
                    <h1>Наші фахівці</h1>
                    {selectedSpec && (
                        <p style={{ color: '#666' }}>
                            Результати для категорії: <strong>{selectedSpec}</strong>
                        </p>
                    )}
                </header>

                {/* Порожній стан */}
                {!selectedSpec && !isLoading && (
                    <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                        <h2>Вітаємо! 👋</h2>
                        <p>Будь ласка, оберіть спеціалізацію зліва, щоб переглянути список доступних лікарів.</p>
                    </div>
                )}

                {/* Завантаження та помилки */}
                {isLoading && <p>Завантаження даних...</p>}
                {isError && <p style={{ color: 'red' }}>Помилка при завантаженні лікарів. Спробуйте пізніше.</p>}

                {/* Сітка з картками */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                    opacity: isPlaceholderData ? 0.6 : 1, // Ефект при пагінації
                    transition: 'opacity 0.2s'
                }}>
                    {data?.content.map(doctor => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onWriteMessage={handleWriteMessage}
                        />
                    ))}
                </div>

                {/* Пагінація */}
                {data && data.totalPages > 1 && (
                    <footer style={paginationWrapperStyle}>
                        <button
                            disabled={page === 0 || isPlaceholderData}
                            onClick={() => setPage(prev => prev - 1)}
                            style={paginationButtonStyle}
                        >
                            ← Назад
                        </button>

                        <span style={{ fontWeight: '500' }}>
                            Сторінка {page + 1} з {data.totalPages}
                        </span>

                        <button
                            disabled={page >= data.totalPages - 1 || isPlaceholderData}
                            onClick={() => setPage(prev => prev + 1)}
                            style={paginationButtonStyle}
                        >
                            Вперед →
                        </button>
                    </footer>
                )}
            </main>

            {/* Вікно чату (якщо обрано лікаря ТА є ID користувача) */}
            {activeChatDoctor && currentUserId && (
                <Chat
                    doctor={activeChatDoctor}
                    onClose={() => setActiveChatDoctor(null)}
                    currentUserId={currentUserId}
                />
            )}
        </div>
    );
};

// --- Стилі (винесені в константи для scannability) ---

const sidebarStyle: React.CSSProperties = {
    width: '250px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '1px solid #dee2e6',
    position: 'sticky',
    top: 0,
    height: '100vh'
};

const navButtonStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'left',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s'
};

const resetButtonStyle: React.CSSProperties = {
    marginTop: '15px',
    color: '#dc3545',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textDecoration: 'underline'
};

const paginationWrapperStyle: React.CSSProperties = {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    alignItems: 'center',
    paddingBottom: '20px'
};

const paginationButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: '0.2s'
};