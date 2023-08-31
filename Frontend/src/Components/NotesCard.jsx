import { Box, Typography } from '@mui/material'
import React  from 'react'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

export default function NotesCard({e}) {
console.log(e)
    return (
        <Box  sx={{width:'90%',margin:'auto',paddingY:'20px',cursor:'pointer'}}>
            <Link  to={`/notes/${e._id}`} style={{textDecoration:'none'}}>
            <Card sx={{ color: 'black', background: '#d7e3ed',margin:'auto','@media (max-width: 272px)':{marginLeft:'10rem'} }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center', paddingX: '10px', background: '#d7e3ed' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Box>
                        
                            <img src={e.profilePic} alt="DP" style={{ borderRadius: '50%', width: '3rem', height: '3rem', paddingRight: '5px',paddingTop:'3px' }} />
                        </Box>
                        <Box sx={{ fontWeight: 600 }}>
                            {e.username}
                        </Box>
                    </Box>
                   
                </Box>
               

        
                <Box sx={{ margin: '5px', paddingBottom:'1rem'}}>
                <Typography sx={{ fontWeight: 600 }} noWrap>
                                    {e.title && e.title.length > 20 ? `${e.title.slice(0, 20)}...` : e.title}
                                    </Typography>
 
                    <Typography sx={{color:'#8a8a8a'}}>{e.categories[0]}</Typography>
                    <Typography sx={{ lineBreak: 'anywhere' }}>
                    {e.desc && e.desc.length > 100 ? `${e.desc.slice(0,800)}...` : e.desc}
                    </Typography>

                
                </Box>
                <Box sx={{marginLeft:'80%'}}>Date: {e.createdAt.replace('T'," Time")}</Box>
        
            </Card>
        </Link>
        </Box>
    )
}
