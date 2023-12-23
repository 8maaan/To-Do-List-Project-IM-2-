import "../PagesCSS/RegisterPage.css"
import "../PagesCSS/Global.css"
import { Button, TextField} from '@mui/material';
import { useState } from "react";
import { authenticateUser } from "../API-Services/apiServices";
import { useNavigate } from "react-router-dom";

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
  

  const navigateTo = useNavigate();
  const handleSubmit = async () =>{
    const authenticate = await authenticateUser(loginCredentials);
    if(authenticate.success){
      localStorage.setItem("uid", authenticate.uid)
      alert(authenticate.message);
      setTimeout(() => {
        navigateTo("/taskspage")
      }, 2000);
    }else{
      alert(authenticate.message);
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
        <div className="footer-fetisher">
          <p>Information Management 2 Final Project by John Randolf Ribo and John Carl Sabejon</p>
          <p>CSIT327 Section G5 Handled by Sir Arthur Layese</p>
        </div>
      </div>
    </div>
  );
}
