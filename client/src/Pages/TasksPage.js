import "../PagesCSS/Global.css"
import "../PagesCSS/TasksPage.css"
import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../API-Services/apiServices';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createTasks } from "../API-Services/apiServices";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


const TaskTextField = ({name, label, type, onChange}) =>{
  return(
    <div className="create-task-fields">
      <TextField name={name} label={label} type={type} size="small" onChange={onChange}/>
    </div>
  )
}

export default function TasksPage() {
  const [task, setTask] = useState([{}]);

  const [createTask, setCreateTask] = useState({
    user_id: 1,
    category_id: "",
    task_name: "",
    description: "",
    due_date: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getAllTasks();
      if (result.success) {
        setTask(result.apiResponse);
        console.log(result.success);
      } else {
        console.log(result.message);
      }
    };
    getData();
  }, []);

  const handleOnSubmit = async () => {
    console.log(createTask);
    const insertTask = await createTasks(createTask);
    if(insertTask.success){
      alert(insertTask.message);
    }else{
      alert(insertTask.message);
    }
  };

  return (
    <div className="bg">
      <div className="taskspage-container">
        <div className="create-task-container">
          <p style={{marginTop:'10%'}}>Create Task</p>
          <FormControl style={{width:'225px', marginTop:'15px'}} size="small">
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              name="category_id"
              size="small"
              style={{textAlign:'left'}}
              labelId="demo-simple-select-label"
              label="Categories"
              value={createTask.category_id}
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

            <TaskTextField name={"task_name"} value={createTask.task_name} label={"Task Name"} onChange={handleInputChange}/>
            <TaskTextField name={"description"} value={createTask.description} label={"Description"} onChange={handleInputChange}/>

            <TextField name="due_date" value={createTask.due_date} size="small" label="Due Date" InputLabelProps={{ shrink: true }} 
              style={{marginTop:'15px', marginBottom:'10px'}} type="date" onChange={handleInputChange}/> 

          </FormControl>
          <br></br>
          <Button variant="contained" onClick={()=>{handleOnSubmit()}}>Submit</Button>  
        </div>

        <div className="show-tasks-container">
          <p style={{marginTop:'5.5%'}}>ToDo List</p>
          {task.map((task, id) => (
            <div key={id} className="task-container">
              <div className="assignment-icon-alignment">
                <AssignmentIcon fontSize="large"/>
              </div>

              <div className="task-info">
                <p>{task.task_name}</p>
                <p>Category: {task.category_name}</p>
                <p>Description: {task.description}</p>
                <p>Due Date: {task.due_date}</p>
              </div>

              <div className="task-action-buttons">
                <IconButton>
                  <EditIcon/>
                </IconButton>

                <IconButton>
                  <CancelIcon/>
                </IconButton>
                
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
