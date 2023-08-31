import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import axios from 'axios'
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Edit({ open, data,setopen }) {
  const[loading,setLoading]=useState(false)
  let localData=localStorage.getItem('id')
  const param=useParams()
  const navigate=useNavigate()
  let { title, categories, photo, desc } = data;
  let [titl, settitle] = useState(title)
  let [categorie, setCategories] = useState(categories);
  let [value, setvalue] = useState('')
  let [descc, setdesc] = useState(desc)

  let handleChange1 = (e) => {
    if(localData==true||localData==null) {return toast.error('login First')}
    settitle(e.target.value)


  }
  let handleChange2 = (e) => {
    if(localData==true||localData==null) {return toast.error('login First')}
    setCategories(e.target.value)


  }

  let handleChange4 = (e) => {
    if(localData==true||localData==null) {return toast.error('login First')}
    setdesc(e.target.value)

  }
  useEffect(() => {
    settitle(title)
    setCategories(categories)
    setdesc(desc)
  }, [title])
  // console.log(value[0])
const handleEdit=async()=>{
  if(localData==true||localData==null) {return toast.error('login First')}
  const formdata=new FormData()
  formdata.append('avatar',value[0])
  formdata.append('title',titl)
  formdata.append('categories',categorie)
  formdata.append('desc',descc)
  
  setLoading(true)
  await axios.put(`/posts/${param.id}`,formdata,{headers:{token:localStorage.getItem('token')}}).then((e)=>{
    setLoading(false)
    if(e.data.status==true){
      toast.success(e.data.message)
      setopen(false)
      navigate('/')
    }
    if(e.data.status==false){
      toast.error(e.data.message)
    }
  })
}


  return (
    data.title != undefined && (<Dialog PaperProps={{ sx: { width: '50%', padding: '20px', display: 'flex', gap: 5 } }} open={open}>
      

      {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>} 
      <TextField name='title' value={titl} onChange={(e) => { handleChange1(e) }} sx={{ fontSize: '5rem' }} id="standard-basic" label="Title" variant="standard" />
      <TextField name='categories' value={categorie} onChange={(e) => { handleChange2(e) }} sx={{ fontSize: '5rem' }} id="standard-basic" label="Sub Title" variant="standard" />
      
      <Textarea name='desc' value={descc} onChange={(e) => { handleChange4(e) }} style={{ border: 'none' }} sx={{ outline: 'none' }} id="outlined-basic" placeholder="Tell Your Story......" variant="outlined" />
      <Button onClick={handleEdit} sx={{ textTransform: 'none', background: 'teal', color: 'black' }}>Save Edit</Button>
      <CloseIcon onClick={()=>setopen(false)}  sx={{position:'absolute',right:5,top:0,cursor:'pointer'   }}/>
    </Dialog>)

  )
}
//
