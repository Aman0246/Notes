import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Edit from './Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CommentPage from './CommentPage';
export default function SingleNotes() {
  const [loading, setLoading] = useState(false)
  let deta = localStorage.getItem('id')
  let params = useParams()
  const [open, setopen] = useState(false)
  const [data, setdata] = useState('')
  const [comment, setcomment] = useState(false)
  const navigate = useNavigate()
  const handleDelete = async () => {

    if (deta == true || deta == null) { return toast.error('login First') }
    setLoading(true)
    await axios.delete(`/posts/${params.id}`, { headers: { token: localStorage.getItem('token') } }).then((e) => {
      setLoading(false)
      if (e.data.status == true) {
        setdata('deleted')
        toast.success(e.data.message)
        navigate('/')
      }
      if (e.data.status == false) {

        toast.error(e.data.message)

      }
    })
  }
  useEffect(() => {
    // console.log(params.id)
    let getsinglepost = async () => {
      setLoading(true)
      await axios.get(`/posts/${params.id}`, { headers: { token: localStorage.getItem('token') } }).then((e) => {
        setLoading(false)
        if (e.data.status == true) {
          setdata(e.data.data)
        }
      })
    }
    getsinglepost()
  }, [])

  return (
    <Box sx={{ marginTop: '14vh' }}>
      {loading && <Box sx={{ position: 'absolute' }}><CircularProgress variant="solid" /></Box>}
      <Box title='Comments' sx={{ marginLeft: "92%", color: '#bc6565' }}><QuestionAnswerIcon onClick={() => setcomment(true)} sx={{ cursor: 'pointer', fontSize: '30px', '@media (max-width: 400px)': { fontSize: '30px', marginTop: '1vh' } }} /></Box>
      <CommentPage comment={comment} setcomment={setcomment} data={data} />

      <Box sx={{ justifyContent: 'center', alignItems: 'left', display: 'flex', padding: '5px 20px', flexDirection: 'column' }}>
        <Box sx={{
          fontSize: '4rem', color: '#545151', '@media (max-width: 639px)': {
            fontSize: '3rem'
          },
        }}>{data.title && data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}</Box>
        <Box sx={{ fontSize: '2rem', color: '#8a8a8a' }}>{data.categories}</Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
          <Box sx={{ fontSize: '1rem', '@media (max-width: 639px)': { fontSize: '1rem' }, color: '#c4aa0e' }}>{data.username}</Box>
          <Box sx={{ display: 'flex',marginLeft:'80%' }}>
            <EditIcon title="Edit" onClick={() => { setopen(true) }} sx={{ cursor: 'pointer', '@media (max-width: 400px)': { fontSize: '30px' }, color: '#8a8a8a', fontSize: '40px' }} />

            <Edit open={open} data={data} setopen={setopen} ></Edit>
            <Box title="Delete" ><DeleteForeverIcon onClick={handleDelete} sx={{ cursor: 'pointer', '@media (max-width: 400px)': { fontSize: '30px'}, color: '#f94f4f', fontSize: '40px' }} /></Box>
          </Box>

        </Box>
        <Box sx={{ fontSize: '1.5rem', color: '#8a8a8a' }}>{data.desc}</Box>
      </Box>
    </Box>
  )
}
