import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/joy/CircularProgress';
import { useDispatch, useSelector} from 'react-redux'
import NotesCard from '../Components/NotesCard'
import {allNotes} from '../Redux/allNotes';
export default function Home() {
  const[loading,setLoading]=useState(false)
  const dispatch = useDispatch()
  const selector=useSelector(state=>state.allNotes)
  useEffect(()=>{
    const gettingAllblog=async()=>{
      setLoading(true)
      await axios.get('/posts').then((e)=>{
        setLoading(false)
        dispatch(allNotes(e.data.data))
      })
    }
    gettingAllblog()
  },[dispatch])
  return (
    <Box sx={{position:'relative'}}>
       {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>} 
      <Box sx={{width:'100%'}}><img style={{width:'100%',height:'130vh',position:'fixed',zIndex:-1}} src="https://imgs.search.brave.com/UTzfOtKkppELfpkQjSY1nCU5h6hffkQ7JvQWq_1YqW8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Nzg0NTA2NzE1MzAt/NWI2YTdjOWYzMmE4/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TVRo/OGZHNXZkR1Z6ZkdW/dWZEQjhmREI4Zkh3/dyZ3PTEwMDAmcT04/MA" alt="Background"  /></Box>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',paddingTop:'5rem'}}>        
        {selector.map((e)=>
        <Box  key={e._id}>
         
          <NotesCard e={e}></NotesCard>
          </Box>
          )}
     </Box>
    </Box>
  )
}
