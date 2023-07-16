import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { LoginResponse, adminLogin, userLogin } from './service';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';
import { getUser } from '../Navbar/service';
import { useParams } from 'react-router-dom';

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

  const { admin } = useParams();

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
    console.log(admin);
    const toastId = toast.loading('Loading ...', { position: 'bottom-right' });
    try {
      let response: LoginResponse | undefined;
      if (admin === 'admin') {
        response = await adminLogin(userDetails);
      } else {
        response = await userLogin(userDetails);
      }

      const me = await getUser(response?.token || '');

      setAuth((current) => {
        return {
          ...current,
          isLoggedin: true,
          username: userDetails.username,
          token: response?.token || '',
          role: me.role,
        };
      });
      localStorage.setItem('token', response?.token || '');
      setUserDetails(defaultUserDetails);
      toast.update(toastId, {
        render: 'Login Successful',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      onClose();
    } catch (e) {
      if (e instanceof Error)
        toast.update(toastId, {
          render: e.message,
          type: 'error',
          isLoading: false,
          autoClose: 1500,
        });
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
