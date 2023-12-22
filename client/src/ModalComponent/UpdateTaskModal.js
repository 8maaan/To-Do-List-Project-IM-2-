// TaskModal.js
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import "../PagesCSS/TasksPage.css"

const TaskModal = ({ open, onClose, currentTask }) => {
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


  const onClickSubmit = () =>{
    const now = new Date();
    const test = now.toISOString(updateTask.due_date).slice(0, 16);
    console.log(test);
    console.log(updateTask.due_date);
  }

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
    </Modal>
  );
};

export default TaskModal;
