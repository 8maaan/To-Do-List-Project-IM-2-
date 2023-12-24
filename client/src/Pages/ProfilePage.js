import NavBar from "../ReusableComponents/NavBar";
import "../PagesCSS/ProfilePage.css"
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../API-Services/apiServices";
import { updateUser } from "../API-Services/apiServices";
import LoadingComponent from "../ReusableComponents/LoadingComponent";
import SnackbarComponent from "../ReusableComponents/SnackbarComponent";
import DeleteAccountModal from "../ReusableComponents/MODAL_DeleteAccount";


export default function ProfilePage (){
    const [userInfo, setUserInfo] = useState([]);
    const [uid] = useState(parseInt(localStorage.getItem("uid")))
    useEffect(() =>{
        const get_users = async () =>{
            const getUserInfo = await getUsers ();

            if(getUserInfo.success){
                const filteredUser = getUserInfo.apiResponse.filter(apiResponse => apiResponse.user_id === uid);
                setUserInfo(filteredUser[0]);
            }else{
                console.log(getUserInfo.message);
            }
        }
        get_users();
    },[uid])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
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

    const [isLoading, setIsLoading] = useState(false);
    const stopLoading = () => {
        setIsLoading(false);
    };

    const [isEdit, setIsEdit] = useState(false);
    const handleOnEdit = async () =>{
        if(isEdit){
            setIsLoading(true);
            const updateuser = await updateUser(userInfo);
            if(updateuser.success){
                setTimeout(() => {
                    handleSnackbarOpen("success", updateuser.message)
                }, 1500);
                setIsEdit(false);
            }else{
                setTimeout(() => {
                    handleSnackbarOpen("error", updateuser.message)
                }, 800);
            }
        }else{
            setIsEdit(true);
        }
    }

    const handleOnCancel = () => {
        setIsEdit(false);
    }

    // to open delete account modal
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const handleDeleteAccount = () =>{
        setOpenModalCancel(true);
      }

    return(
        <div>
            <div className="profile-page-container">
            <NavBar/>
                <br></br>
                <div className="profile-page-info-container">
                    <div className="profile-photo-section">
                        <div className="profile-photo-section-container">
                            <div className="profile-photo-section-icon">
                                
                            </div>
                            <div>
                                <div className="profile-photo-section-button-container">
                                    <Button disabled variant="contained" style={{marginRight:'10px'}}>
                                        Upload Photo
                                    </Button>
                                    <Button disabled color="error" variant="outlined">
                                        Remove Photo
                                    </Button>
                                </div>
                                <div className="profile-photo-section-reminder">
                                    <p>Uploading photo currently not available. Try again later</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-section">
                        <div className="profile-info-section-container">
                            {`Total Tasks Created: ${userInfo.total_tasks}`}
                            <p style={{marginTop:'3%'}}>Username</p>
                            <TextField 
                                name="username"
                                size="small" 
                                disabled={!isEdit} 
                                value={userInfo.username || "undefined"} 
                                className="profile-textfield"
                                onChange={handleInputChange} 
                            />
                            <p>Email Address</p>
                            <TextField 
                                name="email"
                                size="small" 
                                disabled={!isEdit} 
                                value={userInfo.email || "undefined"} 
                                className="profile-textfield"
                                onChange={handleInputChange} 
                            />
                            <p>Password</p>
                            <TextField
                                name="password"
                                type="password" 
                                size="small" 
                                disabled={!isEdit} 
                                value={userInfo.password || "undefined"} 
                                className="profile-textfield"
                                onChange={handleInputChange} 
                            />
                            <br></br>
                            <br></br>
                            <div>
                                <Button variant="contained" className="profile-button" onClick={()=>{handleOnEdit()}}>{isEdit ? "Save" : "Edit Info"}</Button>
                                <Button variant="outlined" disabled={!isEdit} className="profile-button" onClick={()=>{handleOnCancel()}} style={{marginLeft: '5px'}}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                    <div className="profile-delete-section">
                        <p>Delete Account</p>
                        This will immediately delete all of your data, including tasks and more. This can't be undone.
                        <br></br>
                        <br></br>
                        <Button color="error" variant="outlined" style={{width:'28%'}} onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>

            {openModalCancel && 
                <DeleteAccountModal 
                open={openModalCancel}
                onClose={() => {setOpenModalCancel(false)}}/>
            }

            {isLoading && <LoadingComponent onClose={stopLoading}/>}
            {snackbar && <SnackbarComponent open={snackbar} onClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />}
        </div>
    )
}