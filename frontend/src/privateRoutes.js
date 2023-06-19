import LandingPage from './pages/LoginPage';
import { Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
  return token ? <Outlet /> : <LandingPage />
}

export default PrivateRoutes;