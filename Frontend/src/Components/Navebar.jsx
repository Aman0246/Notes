import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../Redux/userSlice'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveMenu from './ResponsiveMenu';

export default function Navebar() {
  const selector = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [menu, setmenu] = useState(false)

  const handleLogout = () => {
    localStorage.clear('persist:root')
    localStorage.clear('id')
    localStorage.clear('FeatureFlags')
    localStorage.clear('token')
    dispatch(logout('a'))
  }
  // console.log(selector)
  return (
    <AppBar>
      <Toolbar sx={{ background: 'white', color: 'black' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingX: '5rem', '@media (max-width: 863px)': { paddingX: "3px" }, alignItems: 'center' }}>
          <Box onClick={() => setmenu(!menu)} sx={{ '@media (min-width: 863px)': { display: 'none' } }}> <ResponsiveMenu menu={menu} setmenu={setmenu} />

          </Box>
          <Box ><Link to={'/'} ><img src={'https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU'} style={{ width: '10rem', height: '4rem' }} alt="" /></Link> </Box>

          <Box sx={{ display: 'flex', gap: 5, '@media (max-width: 863px)': { display: 'none' } }}>
            <Box><Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>HOME</Link> </Box>
            <Box> <Link to={'/create'} style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase' }}>Create_Notes</Link></Box>
            {selector.email ? <Box onClick={handleLogout} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', textTransform: 'uppercase' }}>LogOut</Box> : <Box> <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>Login</Link></Box>}


          </Box>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {selector &&
              <Box sx={{ '@media (max-width: 997px)': { display: 'none' } }}>
                {selector.username}
              </Box>}


            <Box>{selector.email ? <img style={{ width: '2rem', borderRadius: '50%' }} src={selector.profilePic} alt="Dp" /> : <Link to={'/login'}><AccountCircleIcon sx={{ width: '2rem', height: '2rem' }} /></Link>}</Box>
          </Box>
        </Box>
      </Toolbar>

    </AppBar>
  )
}
