// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider }      from './service/context.provider';
import PublicRoute           from './service/PublicRoute';
import CheckAuth             from './service/CheckAuth';

import HomePage              from './routes/HomePage';
import RegisterPage          from './routes/RegisterPage';
import LoginPage             from './routes/LoginPage';
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
          {/* ───── PUBLIC ROUTES ───── */}
          <Route element={<PublicRoute />}>
            <Route index               element={<HomePage />} />
            <Route path="login"        element={<LoginPage />} />
            <Route path="register"     element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password"  element={<ResetPasswordPage />} />
          </Route>

          {/* ───── PROTECTED ROUTES ───── */}
          <Route element={<CheckAuth />}>
            <Route path="home"         element={<MainPage />} />
            <Route path="profile"      element={<ProfilePage />} />
            <Route path="add-warranty" element={<WarantyAddPage />} />
            <Route path="warranty"     element={<MyWarrantyPage />} />
            <Route path="subscribe"    element={<SubscribePage />} />
            <Route path="legalmentions" element={<MentionsLegalesPage />} />
            <Route path="succes"       element={<PaymentSuccessPage />} />
            <Route path="cancel"       element={<PaymentCancelPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
