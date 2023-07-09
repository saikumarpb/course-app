import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '../components/Modal';
import { adminSignup } from './service';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';
import { toast } from 'react-toastify';

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
    console.log('Signup: ', userDetails);
    try {
      const response = await toast.promise(adminSignup(userDetails), {
        pending: 'Loading...',
        success: 'Signup successful',
        error: 'Signup failed',
      });
      setAuth((current) => {
        return { ...current, isLoggedin: true, username: userDetails.username, token: response.token };
      });
      localStorage.setItem('token', response.token);
      setUserDetails(defaultUserDetails);
      onClose();
    } catch (e) {
      console.log(e);
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
