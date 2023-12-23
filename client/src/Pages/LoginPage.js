import "../PagesCSS/RegisterPage.css"
import "../PagesCSS/Global.css"
import { Button, TextField} from '@mui/material';
import { useState } from "react";
import { authenticateUser } from "../API-Services/apiServices";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../ReusableComponents/SnackbarComponent";
import Footer from "../ReusableComponents/Footer";

const LoginTextFields = ({name, value, label, type, onChange}) =>{   
  return(
      <div>
          <TextField size="small" name={name} value={value} label={label} type={type} onChange={onChange}/>
          <br></br>
      </div>
  )
}

export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials(prevState => ({
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
    setSnackbar(false);
  };

  const navigateTo = useNavigate();
  const handleSubmit = async () =>{
    const authenticate = await authenticateUser(loginCredentials);
    if(authenticate.success){
      localStorage.setItem("uid", authenticate.uid)
      localStorage.setItem("username",loginCredentials.username);
      handleSnackbarOpen("success", authenticate.message);
      setTimeout(() => {
        navigateTo("/taskspage")
      }, 2000);
    }else{
      handleSnackbarOpen("error", authenticate.message);
    }
  }


  return (
    <div className="bg">
      <div className="registerpage-container">
        <div className="registration-form-container">
            <p>Log in</p>
            <LoginTextFields name={"username"} value={loginCredentials.username} label={"Username"} onChange={handleInputChange}/>
            <LoginTextFields name={"password"} value={loginCredentials.password} label={"Password"} onChange={handleInputChange} type={"password"}/>
            <Button variant="contained" sx={{marginTop:'2%', marginBottom:'3%'}} onClick={()=>{handleSubmit()}}>Log in</Button>
        </div>
        <Footer/>
      </div>
      {snackbar && <SnackbarComponent open={snackbar} onClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />}
    </div>
  );
}
