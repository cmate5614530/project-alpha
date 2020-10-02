import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  
  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Ribeiro Ababamentos
          </Typography> */}
          
          <Avatar src="/broken-image.jpg" className={classes.small} style={{marginLeft:'85%'}}/>
          <Typography align='right'>&nbsp;&nbsp;{props.user.name}</Typography>

        </Toolbar>
      </AppBar>

      <main>
        <div style={{ marginTop: '50px', }}></div>
      </main>
    </div>
  );
}
