import { Box } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import {auth,provider} from "../Components/FireBase/Firebase"
import axios from 'axios';
import {signInWithPopup} from "firebase/auth"
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector,} from 'react-redux'
import {loginSuccess} from "../Redux/userSlice"

const inputsStructure={
  username:'',
  email:'',
  password:'',
  profilePic:''
}

export default function Login() {
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [inputs,setinputs]=useState(inputsStructure)
  
  const handleChange=(e)=>{  
    setinputs({...inputs,[e.target.name]:e.target.value})
  }
  const signInWithGoogle=()=>{

    setLoading(true)
    signInWithPopup(auth,provider).then((result)=>{
   
      axios.post("/auth/google",{username:result.user.displayName ,email:result.user.email,profilePic:result.user.photoURL}).then((e)=>{
        localStorage.setItem('token',e.data.token)
        console.log(e)
        setLoading(false)
        if(e.data.status==true){
          toast.success(e.data.message)
          dispatch(loginSuccess(e.data.data))
          localStorage.setItem('id',true)
          navigate("/")
        }
        if(e.data.status==false){
          console.log("aman")
          return toast.error(e.data.message)
        }
       
        
      })
    }).catch((e)=>{console.log(e)})}
  const handleLogin=async()=>{
    if(inputs && inputs.Email==0 || inputs.password.length==0){
      return  toast.error("Empty Field")
    }
    
    setLoading(true)
      await axios.post("/auth/login",{...inputs}).then((e)=>{
        // console.log(e.data.token)
        localStorage.setItem('token',e.data.token)
        setLoading(false)
        if(e.data.status==false){return toast.error(e.data.message)}
        if(e.data.status==true){
          localStorage.setItem('id',true)
          dispatch(loginSuccess(e.data.data))
          navigate('/')
           toast.success(e.data.message)}
        
      })
  }
  return (
    <Box sx={{height:'100vh',justifyContent:'center',alignItems:'center',display:'flex',backgroundImage:'url(https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60)',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}>
      <Box sx={{backgroundColor:'white',opacity:.8,width:'30%','@media (max-width:763px)': {width:'80%'},paddingBottom:5}}>
      {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>} 
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5}}>
        <TextField sx={{marginTop:5,width:'60%'}} name='Email' onChange={(e)=>{handleChange(e)}} type='email' color='success' id="standard-basic" label="Email" variant="standard" />
        <TextField sx={{width:'60%'}} color='success' name='password' onChange={(e)=>{handleChange(e)}} type='Password' id="standard-basic" label="Password" variant="standard" />
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>

        <Button onClick={handleLogin} variant="contained" sx={{backgroundColor:'teal'}}>
        Login
      </Button>
      Or
      <Button onClick={signInWithGoogle} sx={{backgroundColor:'teal',fontWeight:600,color:'black'}}><img src='https://imgs.search.brave.com/K2bzYTWwzs1jK-LIjzjfDSF_tBhgNnw1Xql1Q8VZL5Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw' style={{width:'2rem',height:'2rem',borderRadius:'50%',padding:'1px 5px'}}/> Google</Button>
      <Box sx={{cursor:'pointer',fontWeight:600}}>New User ?<Link to={'/signup'}>Register</Link> </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}
