import { Close } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '12px',
};

interface ModalTitleProps {
  title: string;
  closeHandler: (e: React.MouseEvent<unknown, unknown>) => void;
}

function ModalTitle({ title, closeHandler }: ModalTitleProps) {
  return (
    <div className="flex justify-between w-full items-center">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <button type="button" onClick={closeHandler}>
        <Close className="mx-2" />
      </button>
    </div>
  );
}

interface SignupProps {
  show: boolean,
  setShowModal: (x: boolean) => void
}
function Signup({show, setShowModal}: SignupProps) {
  const handleClose = () => setShowModal(false);
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
    e.preventDefault()
    console.log(userDetails)
  }

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col justify-center">
          <ModalTitle title="Create your account" closeHandler={handleClose} />
          <form className="pt-4 flex flex-col gap-4">
            <TextField
              value={userDetails.username}
              onChange={(e) => handleFormChange('username', e.target.value)}
              label="Username"
              required
              type='text'
            />
            <TextField
              label="Password"
              value={userDetails.password}
              onChange={(e) => handleFormChange('password', e.target.value)}
              type='text'
              required
            />
            <Button variant='contained' style={{textTransform: "none"}} onClick={handleSubmit} type='submit'>Signup</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Signup;
