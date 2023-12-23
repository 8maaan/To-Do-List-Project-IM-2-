import React, { useState } from 'react';
import { Box, Button,  Modal } from '@mui/material';
import "../PagesCSS/TasksPage.css"
import { removeTask } from '../API-Services/apiServices';
import LoadingComponent from './LoadingComponent';
import SnackbarComponent from './SnackbarComponent';
import { useNavigate } from 'react-router';

const CancelTaskModal = ({ open, onClose, currentTask, newTaskStatus }) => {
  const [message] = useState(
    newTaskStatus === 'Cancelled' ? 'cancel' : 'complete'
  );

  const [taskToRemove] = useState({
    task_id: currentTask.task_id,
    status: newTaskStatus
  })

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

  const navigateTo = useNavigate();
  const handleOnSubmit = async () =>{
    setIsLoading(true);
    const removetask = await removeTask(taskToRemove);
    if(removetask.success){
      setTimeout(() => {
        handleSnackbarOpen("success", removetask.message)
      }, 800);
      
      setTimeout(() => {
        navigateTo(0);
      }, 1500);
    }else{
      handleSnackbarOpen("success", removetask.message)
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
            <p>Do you want to {message} the task <span style={{fontWeight: '700'}}>{currentTask.task_name}</span>?</p>
            <br></br>
            <div className='yes-no-bottons'>
              <Button variant='contained' onClick={()=>{handleOnSubmit()}}>Yes</Button>
              <Button variant='contained' onClick={onClose}>No</Button>
            </div>
          </div>
        </Box>
        {isLoading && <LoadingComponent onClose={stopLoading}/>}
        {snackbar && <SnackbarComponent open={snackbar} onClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />}
      </div>
    </Modal>
  );
};

export default CancelTaskModal;
