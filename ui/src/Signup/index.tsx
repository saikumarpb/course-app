import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '../components/Modal';

interface SignupProps {
  showSignup: boolean;
  onClose: () => void;
}

function Signup({ showSignup, onClose }: SignupProps) {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const handleFormChange = (key: 'username' | 'password', value: string) => {
    setUserDetails((prev) => {
      if (key === 'username') {
        return { ...prev, username: value };
      } else {
        return { ...prev, password: value };
      }
    });
  };

  const handleSubmit = (e: React.MouseEvent<unknown, unknown>) => {
    e.preventDefault();
    console.log(userDetails);
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
