import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';


function App() {
 

  return (
    <div>
       <Router>
        <Routes>
          
          
          
          {
            <Route path="/" element={
              <div
                // style={{
                //   overflow: 'hidden',
                //   height: '100vh',
                //   position: 'fixed',
                //   width: '100%',
                // }}
              >
                <HomePage />
              </div>
            } />
          }

         { <Route path="/register" element={<div
                style={{
                  overflow: 'hidden',
                  height: '100vh',
                  position: 'fixed',
                  width: '100%',
                }}
              >
                <RegisterPage />
              </div>} />}


          { <Route path="/login" element={<div
                style={{
                  overflow: 'hidden',
                  height: '100vh',
                  position: 'fixed',
                  width: '100%',
                }}
              >
                <LoginPage />
              </div>} />}


        </Routes>
        
      
      </Router>
    </div>
  )
}

export default App
