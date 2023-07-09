import { Close } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { default as MuiModal } from '@mui/material/Modal';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: '400px',
  maxWidth: '750px',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '12px',
};

interface ModalTitleProps {
  title: string | JSX.Element;
  closeHandler: (e: React.MouseEvent<unknown, unknown>) => void;
}

function ModalTitle({ title, closeHandler }: ModalTitleProps) {
  return (
    <div className="flex justify-between w-full items-center">
      {typeof title === 'string' ? (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
      ) : (
        title
      )}

      <button type="button" onClick={closeHandler}>
        <Close className="mx-2" />
      </button>
    </div>
  );
}

interface ModalProps {
  title?: string | JSX.Element;
  body: JSX.Element;
  showModal: boolean;
  closeModal: () => void;
}

function Modal({ title, body, showModal, closeModal }: ModalProps) {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => setIsOpen(showModal), [showModal]);

  useEffect(() => {
    if (!isOpen) {
      closeModal();
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <MuiModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col justify-center">
          {title && <ModalTitle title={title} closeHandler={handleClose} />}
          {body}
        </Box>
      </MuiModal>
    </>
  );
}

export default Modal;
