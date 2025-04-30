import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import { UserProvider } from './service/context.provider';
import MainPage from './routes/mainPage';
import PublicRoute from './service/PublicRoute';
import ProfilePage from './routes/ProfilePage';
import ResetPasswordPage from './routes/ResetPasswordPage';
import WarantyAddPage from './routes/WarantyAddPage';
import MyWarrantyPage from './routes/MyWarrantyPage';

function App() {


  return (
    <UserProvider>
      <Router>
        <Routes>
          {
            <Route path="/" element={
              <div
              >
                <PublicRoute>
                  <HomePage />
                </PublicRoute>

              </div>
            } />
          }

          {<Route path="/register" element={<div
            style={{
              overflow: 'hidden',
              height: '100vh',
              position: 'fixed',
              width: '100%',
            }}
          >
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          </div>} />}


          {<Route path="/login" element={<div
            style={{
              overflow: 'hidden',
              height: '100vh',
              position: 'fixed',
              width: '100%',
            }}
          >
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          </div>} />}

          {<Route path='/home' element={<div
          >

            <MainPage />

          </div>} />}

          {<Route path='/profile' element={<div
          >
            <ProfilePage />
          </div>} />}

          <Route path="/reset-password" element={
            <div
            >
              <ResetPasswordPage />
            </div>
          } />

          <Route path="/add-warranty" element={
            <div
            >
              <WarantyAddPage />
            </div>
          } />
          <Route path="/warranty" element={
            <div
            >
              <MyWarrantyPage />
            </div>
          } />









        </Routes>


      </Router>
    </UserProvider>
  )
}

export default App
