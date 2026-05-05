import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';
import RootLayout from "./layouts/RootLayout/RootLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import {queryClient} from "./services/queryClient.ts";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import {DoctorsPage} from "./pages/DoctorsPage/DoctorsPage.tsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.tsx";
import {DOCTOR_PATH, LOGIN_PATH, ME_PATH, SIGNUP_PATH} from "./constants/paths.ts";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage.tsx";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" />
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>

                        <Route index element={<HomePage />} />
                        <Route path={LOGIN_PATH} element={<LoginPage />} />
                        <Route path={SIGNUP_PATH} element={<SignUpPage />} />

                        <Route element={<RequireAuth />}>
                            <Route path={ME_PATH} element={<ProfilePage />} />
                            <Route path={DOCTOR_PATH} element={<DoctorsPage />} />
                        </Route>

                    </Route>

                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}