// TaskModal.js
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../PagesCSS/TasksPage.css"
import { updateTasks } from '../API-Services/apiServices';
import LoadingComponent from './LoadingComponent';
import SnackbarComponent from './SnackbarComponent';

const MODAL_UpdateTaskModal = ({ open, onClose, currentTask }) => {
  const [updateTask, setUpdateTask] = useState({
      ...currentTask,
      due_date: new Date(currentTask.due_date).toISOString().slice(0, 16),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
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
    setSnackbar(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const stopLoading = () => {
    setIsLoading(false);
  };

  const navigateTo = useNavigate();
  const onClickSubmit = async () => {
    setIsLoading(true);
    const result = await updateTasks(updateTask);
    if (result.success) {
      setTimeout(() => {
        handleSnackbarOpen("success", result.message)
      }, 800);
      
      setTimeout(() => {
        navigateTo(0);
      }, 1500);
    } else {
      handleSnackbarOpen("error", result.message)
    }
  };

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
              <FormControl style={{marginTop:'15px', width:'60%'}} size="small">
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                      name="category_id"
                      size="small"
                      style={{textAlign:'left'}}
                      labelId="demo-simple-select-label"
                      label="Categories"
                      value={updateTask.category_id}
                      onChange={handleInputChange}         
                  >
                      <MenuItem value={1}>Study</MenuItem>
                      <MenuItem value={2}>Projects</MenuItem>
                      <MenuItem value={3}>Homework</MenuItem>
                      <MenuItem value={4}>Work</MenuItem>
                      <MenuItem value={5}>Personal</MenuItem>
                      <MenuItem value={6}>Shopping</MenuItem>
                      <MenuItem value={7}>Health</MenuItem>
                  </Select>
                  <br></br>
                  <TextField name="task_name" label="Task Name" size="small" value={updateTask.task_name} onChange={handleInputChange}/>
                  <br></br>
                  <TextField name="description" label="Description" size="small" value={updateTask.description} onChange={handleInputChange}/>
                  <br></br>
                  <TextField 
                      name="due_date" 
                      label="Due Date" 
                      size="small" 
                      type="datetime-local" 
                      InputLabelProps={{ shrink: true }} 
                      value={updateTask.due_date} 
                      onChange={handleInputChange}/>
          
              </FormControl>
              <br></br>
            <Button variant='contained' onClick={()=>{onClickSubmit()}}>Update Task</Button>
            <br></br>
          </div>
        </Box>
        {isLoading && <LoadingComponent onClose={stopLoading}/>}
        {snackbar && <SnackbarComponent open={snackbar} onClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />}
      </div>
    </Modal>
    
  );
};

export default MODAL_UpdateTaskModal;
