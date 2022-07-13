import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';


function AddNote() {
  return (
    <div className='add-note'>
    <IconButton color="primary">
      <AddCircleIcon className='add-icon' sx={{ fontSize: 50 }}></AddCircleIcon>
    </IconButton>
    </div>
  )
};
export default AddNote;