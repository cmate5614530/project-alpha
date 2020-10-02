import React from 'react';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Typography aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Portfólio
      </Typography>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Pedras</MenuItem>
        <MenuItem onClick={handleClose}>Vidros</MenuItem>
        <MenuItem onClick={handleClose}>Forros</MenuItem>
      </Menu>
    </div>
  );
}
