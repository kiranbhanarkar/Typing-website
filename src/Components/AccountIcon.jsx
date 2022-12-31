import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'; 
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
// const useStyles = makeStyles(()=>({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backdropFilter: 'blur(2px)'
//     },
//     box: {
//         width: 400,
//         textAlign: 'center'
//     }
// }))

function AccountIcon() {
    
    const [open, setOpen] = useState(false);
    const [value, setValue]= useState(0);
    const [user]= useAuthState(auth)
    const {setAlert} = useAlert();
    // console.log('user',user)

    const navigate = useNavigate();
    const handleOpen = () =>{
        if(user){
            navigate('/user');
        }
        else{
        setOpen(true);
        }
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const handleValueChange=(e,v) =>{
        setValue(v);
    }
    
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () =>{
        signInWithPopup(auth, googleProvider)
        .then(async(response)=>{
            const username = response.user.email;
            const ref= await db.collection('usernames').doc(username).set({
                uid: response.user.uid
            }); 
            setAlert({
                open: true,
                type: 'success',
                message: 'Login Succesfull'
            });
            handleClose();
        }).catch((err)=>{
            console.log("error", err);
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please Enter Valid Credentials.'
            });
        })
    }

    const githubProvider = new GithubAuthProvider();
    const signInWithGithub = () =>{
        signInWithPopup(auth, githubProvider)
        .then((respose)=>{ 
            setAlert({
                open: true,
                type: 'success',
                message: 'Login Succesfull'
            });
            handleClose();
        }).catch((err)=>{
            console.log("error", err);
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please Enter Valid Credentials.'
            });
        })
    }

    const logout= () =>{
        auth.signOut()
        setAlert({
            open: true,
            type: 'success',
            message: 'Logged Out🖐🏻'
        });
    }

    // const classes = useStyles();
    
  return (
    <div>
    <PersonIcon onClick={handleOpen}/>
    {(user)&& <ExitToAppIcon onClick={logout}/>}
        <Modal open={open} onClose={handleClose} style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(3px)',
        lableColor:'white'}}>
            <div style={{width:'400px',textAlign: 'center'}}>
            <AppBar position='static' style={{backgroundColor:'transparent'}}>
                <Tabs value={value} onChange={handleValueChange} variant='fullWidth'>
                    <Tab label='login'>login</Tab>
                    <Tab label='signup'>signup</Tab>
                </Tabs>
            </AppBar>
            {value===0 && <LoginForm handleClose={handleClose}/>}
            {value===1 && <SignupForm handleClose={handleClose}/>}
            <Box>
                <span>OR</span>
                <GoogleButton 
                  style={{width:'100%', marginTop:'8px'}} 
                  onClick={signInWithGoogle}/>
            </Box>
            <Box>
                <span>OR</span>
                <div className="github-button" onClick={signInWithGithub}>
                    Login With Github
                </div>
            </Box>
            </div>
        </Modal>
    </div>
  )
}

export default AccountIcon