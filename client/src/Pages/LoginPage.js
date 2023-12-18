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
            <p>Login Form</p>
            <LoginTextFields name={"username"} value={loginCredentials.username} label={"Username"} onChange={handleInputChange}/>
            <LoginTextFields name={"password"} value={loginCredentials.password} label={"Password"} onChange={handleInputChange} type={"password"}/>
            <Button variant="contained" sx={{marginTop:'5%', marginBottom:'3%'}} onClick={()=>{handleSubmit()}}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
