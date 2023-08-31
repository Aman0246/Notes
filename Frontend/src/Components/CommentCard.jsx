import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import CircularProgress from '@mui/joy/CircularProgress';
export default function CommentCard({e,seta,a}) {
  const[loading,setLoading]=useState(false)
  let data=localStorage.getItem('id')
  let params=useParams()
const handleDeleteComment=async(e)=>{
  if(data==true||data==null) {return toast.error('login First')}
  // console.log(localStorage.getItem('id'))
  setLoading(true)
  await axios.delete(`/comment/${e}/${params.id}`,{headers:{token:localStorage.getItem('token')}}).then((e)=>{
    if(e.data.status==true){toast.success(e.data.message)
      setLoading(false)
    }
    
    if(e.data.status==false){toast.error(e.data.message)
      setLoading(false)}

    seta(!a)

  })


}
  return (


    <Box sx={{width:'100%',display:'flex',gap:2,paddingBottom:1,borderBottom:'1px solid #4c4a4a',background:'gray',paddingTop:'5px',paddingLeft:'5px'}}>
        {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>}  
         
    <Box>
            <img  style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}} src={e&&e.profilePic} alt=""  />
    </Box>

    <Box sx={{color:'white',width:'80%'}}>
        <Typography  sx={{ fontSize:'16px',color:'#fffdfd'}}>{e&&e.username}</Typography>
        <Typography  sx={{ fontSize:'13px',color:'#d2fffd'}}>{e&&e.email}</Typography>
        <Typography  sx={{ fontSize:'15px',wordSpacing:5,marginTop:2,color:'black'}}>{e&&e.desc}</Typography>
    </Box>
        <Box title='Delete Comment' onClick={()=>handleDeleteComment(e._id)}><DeleteForeverIcon  sx={{color:'#b80000',cursor:'pointer',paddingRight:'5px'}}/></Box>
</Box>
   
  )
}
