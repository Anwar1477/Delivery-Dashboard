import React from 'react';
import { AppBar as MUIAppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ open, toggleDrawer }) => {
  return (
    <MUIAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Delivery Dashboard
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;