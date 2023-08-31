import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Cp() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop:'10vh',width:'100%',justifyContent:'center',height:'80vh',position:'absolute'}}>
      <CircularProgress variant="solid" />
    </Box>
  );
}