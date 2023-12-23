import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import "../PagesCSS/TasksPage.css"

const CanacelTaskModal = ({ open, onClose, currentTask, newTaskStatus }) => {
    const [message, setMessage] = useState(
        newTaskStatus === 'Cancelled' ? 'cancel' : 'complete'
      );

  return (
    <Modal
      open={open}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-style">
        <div className="modal-content-container">
          <p>Do you want to {message} <span style={{fontWeight: '700'}}>{currentTask.task_name}</span>?</p>

          <div className='yes-no-bottons'>
            <Button variant='contained'>Yes</Button>
            <Button variant='contained' onClick={onClose}>No</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CanacelTaskModal;
