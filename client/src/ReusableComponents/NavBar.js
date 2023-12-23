import { useState } from 'react';
import "../ReusableComponentsCSS/NavBar.css"
import { Link, useNavigate } from 'react-router-dom';
import {  Divider, Menu, MenuItem, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const [uid] = useState(parseInt(localStorage.getItem("uid")));
    const [username] = useState((localStorage.getItem("username")));

    const navigateTo = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("uid");
        localStorage.removeItem("username");
        setTimeout(() => {
            navigateTo("/login")
          }, 2000);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [isLoading, setIsLoading] = useState(false);
    // const stopLoading = () => {
    //     setIsLoading(false);
    // };
    // const navigateTo = useNavigate();
    // const [openDialogue, setOpenDialogue] = useState(false);
    // const [confirmationStatus, setConfirmationStatus] = useState(false);
    // const handleOpenDialog = () => {
    //     setOpenDialogue(true);
    // };
    // const handleConfirmationDialogClose = (confirmed) => {
    //     setOpenDialogue(false);
    //     setConfirmationStatus(confirmed);
    //     console.log(confirmationStatus);

    //     if (confirmed) {
    //         setIsLoading(true);
    //         setTimeout(() => {
    //             localStorage.setItem("isLoggedIn", false);
    //             localStorage.removeItem("uid");
    //             localStorage.removeItem("username");
    //             window.history.replaceState(null, null, '/');
    //             navigateTo("/");
    //             navigateTo(0);
    //         }, 2000);    
    //     }
    // };

    return(
        <div className="banner-container">
            <div className="first-navi-main">
                <div className='navi-left'>
                    <h1>ToDoDis</h1>
                    <Link to='/taskspage'><h3>Home</h3></Link>
                    {/* <Link to='/history'><h3>History</h3></Link> */}
                </div>
                <div className='navi-right'>
                    {uid ? (
                        <>
                            <div className='navi-username-area' onClick={handleClick}>
                                {/* <LogoutIcon style={{fill: "#0075BE"}}/> Log out */}
                                {username}
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Link to ='/history'>
                                    <MenuItem onClick={handleClose}>
                                        {/* <AccountCircleIcon style={{fill: "#0075BE"}}/>  &nbsp;  */}
                                        Task History
                                    </MenuItem>

                                </Link>
                                {/* <Link to ='/transactions'>
                                    <MenuItem onClick={handleClose}>
                                        <PaidIcon style={{fill: "#0075BE"}}/>  &nbsp; Transactions
                                    </MenuItem>
                                </Link> */}
                                <Divider/>
                                <MenuItem onClick={()=>{handleClose(); handleLogOut();}}>
                                    <LogoutIcon style={{fill: "#0075BE"}}/>  &nbsp; Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                            <Link to='/login'><h3>Login | Register</h3></Link>
                        )}
                </div>
                {/* {openDialogue && <ConfirmationDialog status={true} onClose={handleConfirmationDialogClose} title={"Are you sure you want to logout?"} />}
                {isLoading && <LoadingComponent onClose={stopLoading}/>} */}
            </div>
        </div>
    );
}

export default NavBar;