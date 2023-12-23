import "../PagesCSS/Global.css"
import "../PagesCSS/TaskHistory.css"
import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../API-Services/apiServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavBar from "../ReusableComponents/NavBar"

export default function TaskHistoryPage(){
    const [task, setTask] = useState([]);
    const [uid] = useState(parseInt(localStorage.getItem("uid")));

    // gets all the user's task if uid is not null
    useEffect(() => {
        const getData = async () => {
          const result = await getAllTasks();
          if (result.success) {
            const filteredTasks = result.apiResponse.filter(apiResponse => 
              apiResponse.user_id === uid
            );

            const reversedFilteredTasks = filteredTasks.reverse();
            setTask(reversedFilteredTasks);
            console.log(result.message);
          } else {
            console.log(result.message);
          }
        };
        getData();
      }, [uid]);

    return (
        <>
            <NavBar/>
            <div className="show-tasks-container-history">
                <p style={{marginTop:'5.5%', fontWeight: '600', fontSize: '21px', color: '#494949'}}>History List</p>

                {/* renders all tasks */}
                {task.map((task, id) => (task &&
                    <div key={id} className="task-container-history">
                        <div className="assignment-icon-alignment-history">
                            <AssignmentIcon color="secondary" fontSize="large"/>
                        </div>

                        <div className="task-info-history">
                            <p style={{fontWeight: '700'}}>{task.task_name}</p>
                            <p>Category: {task.category_name}</p>
                            <p>Description: {task.description}</p>
                            <p>Due Date: {task.due_date}</p>
                        </div>

                        <div className="task-action-buttons-container-history">

                            {/* changes font color depending on status */}
                            <div className="task-action-buttons-history"
                                style={{
                                    color:
                                        task.status === 'Completed'
                                        ? '#0ecc41'
                                        : task.status === 'In progress'
                                        ? '#bfbfbf'
                                        : task.status === 'Cancelled'
                                        ? 'red'
                                        : 'inherit', // fallback to default color
                                    fontWeight: '700'
                                    }}
                            >
                            {/* <IconButton size="small" color="success" onClick={()=>{handleOnCancel(task, "Completed")}}>
                                <CheckCircleIcon/>
                            </IconButton>

                            <IconButton size="small" color="primary" onClick={()=>{handleOnEdit(task)}}>
                                <EditIcon/>
                            </IconButton>

                            <IconButton size="small" color="error" onClick={()=>{handleOnCancel(task, "Cancelled")}}>
                                <CancelIcon/>
                            </IconButton>  */}
                            {task.status}
                            </div>              
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}