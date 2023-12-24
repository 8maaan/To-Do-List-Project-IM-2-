import React, { useState } from 'react';
import { Box, Button,  Modal } from '@mui/material';
import "../PagesCSS/TasksPage.css"
import { deleteUser } from '../API-Services/apiServices';
import LoadingComponent from './LoadingComponent';
import SnackbarComponent from './SnackbarComponent';
import { useNavigate } from 'react-router';

const DeleteAccountModal = ({open, onClose}) => {
  const [uid] = useState(parseInt(localStorage.getItem("uid")))

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbar(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const stopLoading = () => {
    setIsLoading(false);
  };

    // for delete account
    const navigateTo = useNavigate();
    const handleDeleteAccount = async () =>{
        const deleteaccount = await deleteUser(uid);
        if(deleteaccount.success){
            setTimeout(() => {
                handleSnackbarOpen("success", deleteaccount.message)
                navigateTo("/login")
            }, 1500);
        }else{
            setTimeout(() => {
                handleSnackbarOpen("error", deleteaccount.message)
                navigateTo("/login")
            }, 800);
        }
    }

  return (
    <Modal
      open={open}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    > 
    <div>
        <Box className="modal-style">
          <div className="modal-content-container">
            <p>Deleting your account is permanent. All your data will be wiped out immediately and you won't be able to get it back.</p>
            <br></br>
            <div className='yes-no-bottons'>
              <Button color="error" variant="outlined" onClick={()=>{handleDeleteAccount()}}>Delete</Button>
              <Button variant="contained" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </Box>
        {isLoading && <LoadingComponent onClose={stopLoading}/>}
        {snackbar && <SnackbarComponent open={snackbar} onClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />}
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
