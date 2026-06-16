import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import RootLayout from './layouts/RootLayout/RootLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './services/queryClient';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { DoctorsPage } from './pages/DoctorsPage/DoctorsPage';
import RequireAuth from './components/RequireAuth/RequireAuth';
import {DOCTOR_PUBLIC_PROFILE_PATH, DOCTORS_PATH, LOGIN_PATH, ME_PATH, SIGNUP_PATH} from './constants/paths';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import {DoctorPublicPage} from "./pages/DoctorPublicPage/DoctorPublicPage.tsx";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>

          <Route element={<AuthLayout />}>
            <Route path={LOGIN_PATH} element={<LoginPage />} />
            <Route path={SIGNUP_PATH} element={<SignUpPage />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<RequireAuth />}>
              <Route path={ME_PATH} element={<ProfilePage />} />
              <Route path={DOCTORS_PATH} element={<DoctorsPage />} />
              <Route path={DOCTOR_PUBLIC_PROFILE_PATH} element={<DoctorPublicPage/>}></Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
