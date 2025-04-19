import React from 'react';
import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate, useLocation } from 'react-router-dom';

interface DrawerProps {
  open: boolean;
  toggleDrawer?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track current path

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Deliveries', icon: <LocalShippingIcon />, path: '/deliveries' },
  ];

  return (
    <MUIDrawer
      variant="permanent"
      sx={{
        width: open ? 240 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 56,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          background: '#2C80FF',
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: '#1F5FB1', 
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
