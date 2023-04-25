import * as React from 'react';
import {
   Box,
   Drawer,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProjectsIcon from '../../icons/ProjectsIcon';
import EmployeeIcon from '../../icons/EmployeeIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import AddButton from '../AddButton';

const BurgerMenu = () => {
   const isAdmin = useIsAdmin()
   const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <Box sx={{
         display: 'flex',
         justifyContent: 'center',
      }}>
         <React.Fragment>
            <IconButton
               aria-label="open drawer"
               onClick={handleDrawerOpen}
               edge="start"
               sx={{ height: '40px', width: '40px', color: "#807396", ...(open && { display: 'none' }) }}
            >
               <MenuIcon fontSize='large' />
            </IconButton>
            <Drawer
               open={open}
               onClose={handleDrawerClose}
            >
               <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={handleDrawerOpen}
                  onKeyDown={handleDrawerClose}
               >
                  {isAdmin &&
                     <List>
                        <ListItem disablePadding>
                           <ListItemButton>
                              <AddButton text="Новий проект" />
                           </ListItemButton>
                        </ListItem>
                     </List>
                  }
                  
                  <List>
                     <ListItem disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              <ProjectsIcon />
                           </ListItemIcon>
                           <ListItemText primary='Проекти' />
                        </ListItemButton>
                     </ListItem>
                  </List>

                  <List>
                     <ListItem disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              <EmployeeIcon />
                           </ListItemIcon>
                           <ListItemText primary='Працівники' />
                        </ListItemButton>
                     </ListItem>
                  </List>

                  <List>
                     <ListItem disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              <SettingsIcon />
                           </ListItemIcon>
                           <ListItemText primary='Налаштування' />
                        </ListItemButton>
                     </ListItem>
                  </List>
               </Box>
            </Drawer>
         </React.Fragment>
      </Box>
   );
};

export default BurgerMenu;