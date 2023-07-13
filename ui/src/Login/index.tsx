import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { adminLogin } from './service';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';
import { getUser } from '../Navbar/service';

interface LoginProps {
  showLogin: boolean;
  onClose: () => void;
}

const defaultUserDetails = {
  username: '',
  password: '',
};

function Login({ showLogin, onClose }: LoginProps) {
  const setAuth = useSetRecoilState(authState);

  const [userDetails, setUserDetails] = useState(defaultUserDetails);

  const handleFormChange = (key: 'username' | 'password', value: string) => {
    setUserDetails((prev) => {
      if (key === 'username') {
        return { ...prev, username: value };
      } else {
        return { ...prev, password: value };
      }
    });
  };

  const handleSubmit = async (e: React.MouseEvent<unknown, unknown>) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        adminLogin(userDetails),
        {
          pending: 'Loading...',
          success: 'Login successful',
          error: 'Login failed',
        },
        { position: 'bottom-right' }
      );

      const me = await getUser(response.token);

      setAuth((current) => {
        return {
          ...current,
          isLoggedin: true,
          username: userDetails.username,
          token: response.token,
          role: me.role,
        };
      });
      localStorage.setItem('token', response.token);
      setUserDetails(defaultUserDetails);
      onClose();
    } catch (e) {
      console.log(e);
      toast.error('Fetching user failed');
    }
  };

  const modalBody = (
    <form className="pt-4 flex flex-col gap-4">
      <TextField
        value={userDetails.username}
        onChange={(e) => handleFormChange('username', e.target.value)}
        label="Username"
        required
        type="text"
      />
      <TextField
        label="Password"
        value={userDetails.password}
        onChange={(e) => handleFormChange('password', e.target.value)}
        type="text"
        required
      />
      <Button
        variant="contained"
        style={{ textTransform: 'none' }}
        onClick={handleSubmit}
        type="submit"
      >
        Login
      </Button>
    </form>
  );

  return (
    <Modal
      title="Login to your account"
      body={modalBody}
      showModal={showLogin}
      closeModal={onClose}
    />
  );
}

export default Login;
