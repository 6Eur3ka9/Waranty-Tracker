// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider }      from './service/context.provider';
import PublicRoute           from './service/PublicRoute';
import CheckAuth             from './service/CheckAuth';

import HomePage              from './routes/HomePage';
import LoginPage             from './routes/LoginPage';
import RegisterPage          from './routes/RegisterPage';
import ForgotPasswordPage    from './routes/ForgotPasswordPage';
import ResetPasswordPage     from './routes/ResetPasswordPage';
import MainPage              from './routes/MainPage';
import ProfilePage           from './routes/ProfilePage';
import WarantyAddPage        from './routes/WarantyAddPage';
import MyWarrantyPage        from './routes/MyWarrantyPage';
import SubscribePage         from './routes/SubscribePage';
import MentionsLegalesPage   from './routes/MentionsLegalesPage';
import PaymentSuccessPage    from './routes/PaymentSuccessPage';
import PaymentCancelPage     from './routes/PaymentCancelPage';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* PUBLIC */}
          <Route element={<PublicRoute />}>
            <Route path='/'                    element={<HomePage />} />
            <Route path="/login"            element={<LoginPage />} />
            <Route path="/register"         element={<RegisterPage />} />
            <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
            <Route path="/reset-password"   element={<ResetPasswordPage />} />
          </Route>

          
            <Route path="/succes"           element={<PaymentSuccessPage />} />
            <Route path="/cancel"           element={<PaymentCancelPage />} />

          {/* PROTÉGÉ */}
          <Route element={<CheckAuth />}>
            <Route path="/home"             element={<MainPage />} />
            <Route path="/profile"          element={<ProfilePage />} />
            <Route path="/add-warranty"     element={<WarantyAddPage />} />
            <Route path="/warranty"         element={<MyWarrantyPage />} />
            <Route path="/subscribe"        element={<SubscribePage />} />
            <Route path="/legalmentions"    element={<MentionsLegalesPage />} />
          </Route>
          {/* 404 */}
           <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
