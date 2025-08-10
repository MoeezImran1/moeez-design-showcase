import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedAdmin from './EnhancedAdmin';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin-login');
    }
  }, [navigate]);

  return <EnhancedAdmin />;
};

export default Admin;