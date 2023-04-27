import React, {useState} from 'react';
import {
   Box,
   Drawer,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProjectsIcon from '../../icons/ProjectsIcon';
import EmployeeIcon from '../../icons/EmployeeIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import AddButton from '../AddButton';
import { useNavigate } from 'react-router-dom';
import Dialog from '../Dialog';
import NewProjectForm from '../NewProjectForm';

const BurgerMenu = () => {
   const isAdmin = useIsAdmin();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

   const openNewProjectModal = () => {
      setIsNewProjectModalOpen(true)
   }

   const onClose = () => setIsNewProjectModalOpen(false)

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
                           <ListItemButton onClick={openNewProjectModal}>
                              <AddButton text="Новий проект" />
                           </ListItemButton>
                        </ListItem>
                     </List>
                  }
                  
                  <List>
                     <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/dashboard/projects')}>
                           <ListItemIcon>
                              <ProjectsIcon />
                           </ListItemIcon>
                           <ListItemText primary='Проекти' />
                        </ListItemButton>
                     </ListItem>
                  </List>

                  <List>
                     <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/dashboard/employees')}>
                           <ListItemIcon>
                              <EmployeeIcon />
                           </ListItemIcon>
                           <ListItemText primary='Працівники' />
                        </ListItemButton>
                     </ListItem>
                  </List>

                  <List>
                     <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/dashboard/settings')}>
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
         <Dialog isOpen={isNewProjectModalOpen} onClose={onClose}>
            <NewProjectForm onCancel={onClose} />
         </Dialog>
      </Box>
   );
};

export default BurgerMenu;