import "../PagesCSS/RegisterPage.css"
import "../PagesCSS/Global.css"
import { Button, TextField} from '@mui/material';
import { useState } from "react";
import { createUser } from "../API-Services/apiServices";
import { useNavigate } from "react-router-dom";

const RegisterTextFields = ({name, value, label, type, onChange}) =>{   
  return(
      <div>
          <TextField size="small" name={name} value={value} label={label} type={type} onChange={onChange}/>
          <br></br>
      </div>
  )
}

export default function RegisterPage() {
  const [user, setUser] = useState({
    username:"",
    password:"",
    email:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigateTo = useNavigate();
  const handleSubmit = async () =>{
    console.log(user);
    const insertUser = await createUser(user);
    if(insertUser.success){
      alert(insertUser.message);
      setTimeout(() => {
        navigateTo("/login")
      }, 2000);
    }else{
      alert(insertUser.message);
    }
  }

  return (
    <div className="bg">
      <div className="registerpage-container">
        <div className="registration-form-container">
            <p>Sign Up</p>
            <RegisterTextFields name={"email"} value={user.email} label={"Email Address"} onChange={handleInputChange}/>
            <RegisterTextFields name={"username"} value={user.username} label={"Username"} onChange={handleInputChange}/>
            <RegisterTextFields name={"password"} value={user.password} label={"Password"} type={"password"} onChange={handleInputChange}/>
            <RegisterTextFields label={"Re-type Password"} type={"password"}/>
            <Button variant="contained" sx={{marginTop:'2%', marginBottom:'3%'}} onClick={()=>{handleSubmit()}}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
