import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userSlice';

export default function ResponsiveMenu({menu}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selector = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.clear('persist:root')
    localStorage.clear('id')
    localStorage.clear('FeatureFlags')
    dispatch(logout('a'))
  }
  return (
    <div>
      <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon/>
      
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
            <MenuItem><Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>HOME</Link> </MenuItem>
            <MenuItem> <Link to={'/create'} style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase' }}>Create_Notes</Link></MenuItem>
            {selector.email ? <MenuItem onClick={handleLogout} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', textTransform: 'uppercase' }}>LogOut</MenuItem> : <MenuItem> <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>Login</Link></MenuItem>}
      </Menu>
    </div>
  );
}