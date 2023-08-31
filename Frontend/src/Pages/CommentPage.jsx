import React, { useEffect, useRef, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/joy/Button';
import CommentCard from '../Components/CommentCard';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import CircularProgress from '@mui/joy/CircularProgress';
export default function CommentPage({ data, setcomment, comment }) {
    const[loading,setLoading]=useState(false)
const[a,seta]=useState(false)
const reference=useRef()
    const params = useParams()
    const [inputs,setinputs]=useState('')
    const [arrayComment,setArrayComment]=useState([])
    
    const [addCommentdata, setcommentdata] = useState()
        const selector = useSelector(state => state.user)
    const [Comments, Setcomment] = useState({
        userId:selector._id,
        postId:params.id,
        username:selector.username,
        profilePic:selector.profilePic,
        email: selector.email,
        
    })

    const handleChange = (e) => {
        setinputs(e.target.value)
        Setcomment({ ...Comments, [e.target.name]: e.target.value })
    }
// console.log(Comments)
    const handlePost = async () => {
        if (!localStorage.getItem('id')) { return toast.error("Please Login") }
        if (Comments.desc == undefined || Comments.desc?.length == 0) {
            return toast.error("Add Comment")
        }
        
        setLoading(true)
        await axios.post('/comment', Comments,{headers:{token:localStorage.getItem('token')}}).then((e) => {
            setLoading(false)
            setcommentdata(e.data.data)
            // console.log(e.data.data)
            if (e.data.status == true) {
                return toast.success(e.data.message)
            }
            if (e.data.status == false) {
                return toast.error(e.data.message)
            }
        })
        setinputs('')
        seta(!a)
    }

    useEffect(()=>{

        const allcomment=async()=>{
            setLoading(true)
          await axios.get(`/comment/comment/${params.id}`,{headers:{token:localStorage.getItem('token')}}).then((e)=>{
            setLoading(false)
            setArrayComment(e.data.data)
          })
        }
        allcomment()
        reference.current?.scrollIntoView()
    },[a,arrayComment&&arrayComment.length])
    
    // console.log(arrayComment)




    return (
        <Dialog PaperProps={{ sx: { width: '150vh', maxWidth: '150vh', height: '80vh' } }} open={comment}>
            <Box sx={{ display: 'flex', height: '80vh','@media (max-width: 809px)':{flexDirection:'column',gap:'2'} }}>
              {loading&&<Box sx={{position:'absolute'}}><CircularProgress variant="solid" /></Box>} 
                <Box sx={{ flex: 2, height: '80vh', overflow: 'scroll', display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', paddingBottom: 1, height: '10%', alignItems: 'center', borderBottom: '1px solid red' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                                <img src={data.profilePic} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} alt="owner Pic" srcset="" />
                                <Typography>{data.username}</Typography>
                            </Box>
                            <CloseIcon onClick={() => setcomment(false)} sx={{ cursor: 'pointer' }} />
                        </Box>
                        <Box sx={{ height: '60%', overflow: 'scroll', flex: 10 }} >
                        {arrayComment&&arrayComment.map((e)=>(

                            <CommentCard e={e} seta={seta} a={a} />
                            ))}
                            <Box sx={{mt:"20px"}} ref={reference}></Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center', height: '20%','@media (max-width: 395px)':{flexDirection:'column',gap:'2'}  }}>
                            <Box sx={{ flex: 6 }}><Input value={inputs} sx={{ width: "100%" }} onChange={(e) => handleChange(e)} name='desc' placeholder="Add Comment..." variant="solid" /></Box>
                            <Box sx={{ flex: 1 }}>

                                <Button   onClick={handlePost}>comment</Button>
                               
                            </Box>

                        </Box>

                    </Box>

                </Box>
            </Box>
        </Dialog>
    )
}
