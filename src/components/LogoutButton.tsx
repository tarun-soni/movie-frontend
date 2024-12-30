'use client';

import { useAuth } from '../app/context/auth-context';
import Button from './button';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      className="text-sm text-primary hover:underline"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
