import { Box,TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import Textarea from '@mui/joy/Textarea';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreateNotes() {
    const [loading, setLoading] = useState(false)
    const selector = useSelector(state => state)
    let data = localStorage.getItem('id')
    const [inputs, setinputs] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        if (data == true || data == null) { return toast.error('login First') }
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handlePublish = async () => {

        if (data == true || data == null) { return toast.error('login First') }
        if (inputs.title == undefined || inputs.categories == undefined || inputs.desc == undefined || inputs.title.length == 0 || inputs.categories.length == 0 || inputs.desc.length == 0) {
            return toast.error('please fill all Inputs')
        }
        await axios.post('/posts/', { ...inputs,profilePic:selector.user.profilePic }, { headers: { token: localStorage.getItem('token') } }).then((e) => {
            setLoading(false)
            if (e.data.status == true) {
                toast.success(e.data.message)
                navigate('/')
            }
            if (e.data.status == false) {
                return toast.error(e.data.message)
            }
        })

    }
    return (
        <Box sx={{ marginTop: '5rem', marginX: '20px', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'Left' }}>
            {loading && <Box sx={{ position: 'absolute' }}><CircularProgress variant="solid" /></Box>}
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>


            </Box>
            <TextField name='title' onChange={(e) => { handleChange(e) }} sx={{ fontSize: '5rem' }} id="standard-basic" label="Heading" variant="standard" />
            <TextField name='categories' onChange={(e) => { handleChange(e) }} sx={{ fontSize: '5rem' }} id="standard-basic" label="subHeading" variant="standard" />
            <Textarea name='desc' onChange={(e) => { handleChange(e) }} style={{ border: 'none' }} sx={{ outline: 'none' }} id="outlined-basic" placeholder="Write your notes......" variant="outlined" />
            <Button onClick={handlePublish} sx={{ textTransform: 'none', background: 'teal' }}>Publish</Button>

        </Box>
    )
}
