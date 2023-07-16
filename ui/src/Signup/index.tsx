import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '../components/Modal';
import { SignupResponse, adminSignup, userSignup } from './service';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface SignupProps {
  showSignup: boolean;
  onClose: () => void;
}

const defaultUserDetails = {
  username: '',
  password: '',
};

function Signup({ showSignup, onClose }: SignupProps) {
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
    const toastId = toast.loading('Signing in ...', {
      position: 'bottom-right',
    });
    try {
      let response: SignupResponse | undefined;
      if (admin === 'admin') {
        response = await adminSignup(userDetails);
      } else {
        response = await userSignup(userDetails);
      }
      setAuth((current) => {
        return {
          ...current,
          isLoggedin: true,
          username: userDetails.username,
          token: response?.token || '',
          role: admin === 'admin' ? 'admin' : 'user',
        };
      });
      localStorage.setItem('token', response?.token || '');
      setUserDetails(defaultUserDetails);
      toast.update(toastId, {
        isLoading: false,
        render: 'Signup successful',
        autoClose: 1500,
        type: 'success',
      });
      onClose();
    } catch (e) {
      if (e instanceof Error)
        toast.update(toastId, {
          isLoading: false,
          render: e.message,
          autoClose: 1500,
          type: 'error',
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
        Signup
      </Button>
    </form>
  );

  return (
    <Modal
      title="Create your account"
      body={modalBody}
      showModal={showSignup}
      closeModal={onClose}
    />
  );
}

export default Signup;
