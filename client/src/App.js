import './App.css';
import RegisterPage from "./Pages/RegisterPage"
import TasksPage from './Pages/TasksPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route> 
            <Route index element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/taskspage" element={<TasksPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
