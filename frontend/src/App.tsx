import {useEffect, type JSX } from 'react';
import { Route, Routes, Navigate,  } from 'react-router-dom';

import FloatingShape from './Components/FloatingShape';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import EmailVerificationPage from './Pages/EmailVerificationPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import DashboardPage from './Pages/DashboardPage';

import { useAuthStore } from '../store/authStore';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({children}:{children: JSX.Element}) => {
  const { isCheckingAuth, isAuthenticated, user } = useAuthStore();

  if(isCheckingAuth) return <Loader className='stroke-green-700 size-4 md:size-6 lg:size-8' />

  if(!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  if(!user.isVerified) {
    return <Navigate to={'/verify-email'} replace />
  }

  return children;
}

const RedirectAuthenticatedUser = ({children}:{children: JSX.Element}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified)
    return <Navigate to="/" replace />
  
  return children;
}

function App(): JSX.Element {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();

    console.log(isAuthenticated);
    console.log(user);
  },[checkAuth])

  return (
    <div className='min-h-screen min-w-screen md:py-8 px-4
    bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative flex
    items-center justify-center'>
      <FloatingShape colour="bg-green-500" size="w-32 h-32 md:w-48 h-48 lg:w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape colour="bg-emerald-500" size="w-24 h-24 md:w-32 h-32 lg:w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape colour="bg-lime-500" size="w-20 h-20 md:w-24 h-24 lg:w-32 h-32" top="40%" left="10%" delay={2} />

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }></Route>

        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
          }></Route>

        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }></Route>

        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }></Route>

        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        }></Route>

        <Route path='/verify-email' element={<EmailVerificationPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
