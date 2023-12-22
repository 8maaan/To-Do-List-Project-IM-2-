import "../PagesCSS/Global.css"
import "../PagesCSS/TasksPage.css"
import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../API-Services/apiServices';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createTasks } from "../API-Services/apiServices";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TaskModal from "../ModalComponent/UpdateTaskModal";


const TaskTextField = ({name, label, type, onChange}) =>{
  return(
    <div className="create-task-fields">
      <TextField name={name} label={label} type={type} size="small" onChange={onChange}/>
    </div>
  )
}

export default function TasksPage() {
  // Functions and components for Create Task container
  const [task, setTask] = useState([]);
  const [uid] = useState(parseInt(localStorage.getItem("uid")));

  const [createTask, setCreateTask] = useState({
    user_id: uid,
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
        const filteredTasks = result.apiResponse.filter(apiResponse => 
          apiResponse.user_id === uid
        );
        setTask(filteredTasks);
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    };
    getData();
  }, [uid]);

  const clearFields = () =>{
    setCreateTask({
      category_id: "",
      task_name: "",
      description: "",
      due_date: ""
    })  
  }

  const handleOnSubmit = async () => {
    console.log(createTask);
    const insertTask = await createTasks(createTask);
    if(insertTask.success){
      alert(insertTask.message);
      clearFields();
    }else{
      alert(insertTask.message);
    }
  };

  // Functions and components for ToDo List container
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null)
  
  const handleOnEdit = (task) =>{
    console.log(task);
    setOpenModal(true);
    setCurrentTask(task)
  }
  


  return (
    <div className="bg">
      <div className="taskspage-container">
        <div className="create-task-container">
          <p style={{marginTop:'10%'}}>Create Task</p>
          <FormControl style={{width:'225px', marginTop:'15px'}} size="small">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
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

            <TextField
              name="due_date"
              value={createTask.due_date}
              size="small"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: '15px', marginBottom: '10px' }}
              type="datetime-local"
              onChange={handleInputChange}
            />

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

              <div className="task-action-buttons-container">
                <div className="task-action-buttons">
                  <IconButton size="small" color="primary">
                    <CheckCircleIcon/>
                  </IconButton>

                  <IconButton size="small" color="primary" onClick={()=>{handleOnEdit(task)}}>
                    <EditIcon/>
                  </IconButton>

                  <IconButton size="small" color="primary">
                    <CancelIcon/>
                  </IconButton> 
                </div>              
              </div>
            </div>
          ))}
          {currentTask && 
            <TaskModal 
              open={openModal}
              onClose={() => { setCurrentTask(null); setOpenModal(false)}}
              currentTask={currentTask}/>
          }
        </div>
      </div>
    </div>
  );
}
