import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'
import { auth } from '../firebaseConfig'
import errorMapping from '../Utils/errorMapping'


function LoginForm({handleClose}) {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const {setAlert}= useAlert()
    const {theme} = useTheme();

    const handleSubmit=()=>{
        if(!email || !password){
            setAlert({
                open: true,
                type: 'warning',
                message: 'fill all details'
            });
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
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
                message: errorMapping[err.code] || 'Some error Occured'
            });
        })
        
    }

  return (
    <Box p={3} style={{display:"flex", flexDirection:'column', gap:"20px"}}>
        <TextField type='email' label='Enter Email'
        InputLabelProps={{
            style: {
                color: theme.title
            }
        }}
        InputProps={{
            style: {
                color: theme.title
            } 
        }}
        onChange={(e)=>setEmail(e.target.value)}></TextField>

        <TextField type='password' label='Enter Password'
        InputLabelProps={{
            style: {
                color: theme.title
            }
        }}
        InputProps={{
            style: {
                color: theme.title
            } 
        }}
        onChange={(e)=>setPassword(e.target.value)}></TextField>

        <Button variant='contained' size='large'
        style= {{backgroundColor: theme.title}}
        onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default LoginForm