import { Box } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/joy/CircularProgress';
export default function Register() {
  const[loading,setLoading]=useState(false)
  const [inputs,setinputs]=useState('')
  const navigate=useNavigate()
const handleChange=(e)=>{
  setinputs({...inputs,[e.target.name]:e.target.value})
}
const handlesubmit=async(e)=>{
  e.preventDefault();
  let formData=new FormData()
  formData.append('username',inputs.username)
  formData.append('email',inputs.email)
  formData.append('password',inputs.password)
  setLoading(true)
  await axios.post("/auth/register",formData).then((data)=>{
    setLoading(false)
    // console.log(data)
    if(data.data.status==true){
       toast.success(data.data.message)
       navigate('/login')
    }
    if(data.data.status==false){
      return toast.error(data.data.message)
    }

  })
}
  return (
    <Box sx={{height:'100vh',justifyContent:'center',alignItems:'center',display:'flex',backgroundImage:'url(https://plus.unsplash.com/premium_photo-1683417272601-dbbfed0ed718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)',backgroundPosition:'center',backgroundSize:'100%',backgroundRepeat:'no-repeat',}}>
      <Box sx={{backgroundColor:'white',opacity:.8,width:'30%','@media (max-width:763px)': {width:'80%'},paddingBottom:5}}>
      {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>} 
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:0}}>
            
        <TextField sx={{marginTop:2,width:'60%'}}  onChange={(e)=>{handleChange(e)}} name='username' color='success' id="standard-basic" label="username" variant="standard" />
        <TextField sx={{marginTop:2,width:'60%'}} onChange={(e)=>{handleChange(e)}} name='email' color='success' id="standard-basic" label="Email" variant="standard" />
        <TextField sx={{width:'60%',marginTop:2}} onChange={(e)=>{handleChange(e)}} name='password' type='password' color='success' id="standard-basic" label="Password" variant="standard" /> 
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,mt:2}}>

        <Button onClick={handlesubmit} variant="contained" sx={{backgroundColor:'teal'}}>
        Sign up
      </Button>
      <Box sx={{cursor:'pointer',fontWeight:600}}>Already Registered ? <Link to={'/login'}>Login</Link> </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}
