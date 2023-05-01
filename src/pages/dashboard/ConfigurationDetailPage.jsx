import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
   Box,
   Grid,
   IconButton,
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   InputBase,
   useMediaQuery
} from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux'
import SingleLineImageList from '../../components/ImageList'
import { imageUrls, mockedComplectationsData, mockedDetailsData, mockedFurnitureData } from '../../services/mockedData'
import { useDropzone } from 'react-dropzone';
import DetailsTable from '../../components/DetailsTable';
import DeleteIcon from '../../icons/DeleteIcon';
import { useIsAdmin } from '../../hooks/useIsAdmin.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DialogConfirmCancel from '../../components/DialogConfirmCancel';
import { useNavigate } from 'react-router-dom';
import { handleExportFile } from '../../helpers/exportFile';
import Button from '../../components/Button';
import TouchTable from '../../components/FurnitureTable/FurnitureTable';

const DropzoneWrapperStyles = styled('div')(({ theme }) => ({
   width: '100%',
   minHeight: '220px',
   border: '2px solid #E8E8E8',
   borderRadius: '6px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginTop: '10px'
}));

const DropzoneStyles = styled('div')(({ theme }) => ({
   display: 'flex',
   textAlign: 'center',
   justifyContent: 'center',
   width: '90%',
   height: '100px',
   backgroundColor: '#FAFAFA',
   border: '2px dashed #E8E8E8',
   borderRadius: '6px',
   cursor: 'pointer',
   marginTop: '20px'
}));

const DropzoneTextStyles = styled('p')(({ theme }) => ({
   textAlign: 'center',
   fontStyle: 'italic',
}));

const PreviewContainerStyles = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
   width: '100%',
   height: '100%',
   margin: '10px'
}));


const ImageStyles = styled('img')(({ theme }) => ({
   width: '100px',
   height: '100px',
   objectFit: 'contain',
}));

const ConfigurationDetailPage = () => {
   const isAdmin = useIsAdmin();
   const navigate = useNavigate();
   const isTablet = useMediaQuery('(max-width:1100px)');
   const isMobile = useMediaQuery('(max-width:540px)');

   const [isEditingMode, setIsEditingMode] = useState(false);
   const [uploadedImages, setUploadedImages] = useState([]);
   const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
   const currentProjectId = useSelector(state => state.project.currentProjectId);

   const [characters, updateCharacters] = useState(mockedFurnitureData);

   const openSaveDialog = () => setIsSaveDialogOpen(true);
   const closeSaveDialog = () => setIsSaveDialogOpen(false);
   const openCancelDialog = () => setIsCancelDialogOpen(true);
   const closeCancelDialog = () => setIsCancelDialogOpen(false);

   const onSave = () => {
      closeSaveDialog()
   };

   const handleOnDragEnd = (result) => {
      if (!result.destination) return;

      const items = Array.from(characters);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      updateCharacters(items);
   }

   const handleSave = (index) => {
      setUploadedImages((prevImages) =>
         prevImages.filter((image, i) => i !== index)
      );
   };

   const { getRootProps } = useDropzone({
      accept: {
         'image/*': []
      },
      onDrop: acceptedFiles => {
         const files = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
         }))
         setUploadedImages((prevImages) => [...prevImages, ...files]);
      }
   });

   async function fetchImagesAsBlobs(linksArray) {
      const promisesArray = linksArray.map((link) => fetch(link).then((r) => r.blob()));
      const blobsArray = await Promise.all(promisesArray);
      return blobsArray;
   };

   return (
      <>
         {isTablet &&
            <Box sx={{ width: '92%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>

               <Box mt='15px'>
                  <Button variant="outlined"
                     startIcon={<ArrowBackIosNewIcon />}
                     onClick={() => {
                        if (isEditingMode) {
                           openCancelDialog();
                        } else navigate(`/dashboard/project/${currentProjectId}`)
                     }}
                  >
                     Назад
                  </Button>
               </Box>

               {uploadedImages.length > 0 &&
                  <SingleLineImageList images={uploadedImages} />
               }

               {uploadedImages.length === 0 &&
                  <Box marginTop='30px' sx={{ border: '2px solid #E8E8E8', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Typography textAlign='center'>Жодного фото ще не завантажено</Typography>
                  </Box>
               }

               {isEditingMode &&
                  <DropzoneWrapperStyles>
                     <DropzoneStyles {...getRootProps()}>
                        <DropzoneTextStyles style={{ marginTop: '40px' }}>
                           Перетягніть файли сюди або натисніть, щоб вибрати зображення
                        </DropzoneTextStyles>
                     </DropzoneStyles>

                     <PreviewContainerStyles>
                        <DropzoneTextStyles style={{ margin: '0', paddingLeft: '15px' }}>
                           Спершу додайте основну світлину*
                        </DropzoneTextStyles>
                        {uploadedImages.length > 0 && (
                           <Grid m='10px' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              {uploadedImages.map((image, index) => {
                                 const imageUrl = URL.createObjectURL(image);
                                 return (
                                    <Grid item key={index} sx={{ position: 'relative', marginLeft: '10px' }}>
                                       <ImageStyles src={imageUrl} alt={image.name} />
                                       <IconButton aria-label="remove"
                                          sx={{ position: 'absolute', bottom: '0px', right: '0px' }}
                                          onClick={() => handleSave(index)}
                                       >
                                          <DeleteIcon />
                                       </IconButton>
                                    </Grid>
                                 )
                              })}
                           </Grid>
                        )}
                     </PreviewContainerStyles>
                  </DropzoneWrapperStyles>
               }

               <Box mt='30px' mb='30px'>
                  <DetailsTable title='Деталі' detailsData={mockedDetailsData} />
               </Box>

               <Box mt='30px'>
                  <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Фурнітура</Typography>

                  {!isEditingMode &&
                     <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '350px' : '900px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                           <TableHead>
                              <TableRow>
                                 <TableCell align="left">Найменування</TableCell>
                                 <TableCell align="left">Код виробу</TableCell>
                                 <TableCell align="center">Кількість</TableCell>
                                 <TableCell align="center">Параметер 4</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {mockedFurnitureData.map((project, index) => (
                                 <TableRow key={project.id}>
                                    <TableCell align="left">{project.param1}</TableCell>
                                    <TableCell align="left">{project.param2}</TableCell>
                                    <TableCell align="center">{project.param3}</TableCell>
                                    <TableCell align="center">{project.param4}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  }

                  {isEditingMode &&
                     <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                           {(provided) => (
                              <TableContainer
                                 component={Paper}
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                                 sx={{ maxWidth: isMobile ? '350px' : '900px' }}>
                                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                       <TableRow>
                                          <TableCell align="left"></TableCell>
                                          <TableCell align="left">Найменування</TableCell>
                                          <TableCell align="left">Код виробу</TableCell>
                                          <TableCell align="center">Кількість</TableCell>
                                          <TableCell align="center">Параметер 4</TableCell>
                                          <TableCell align="left">Видалення</TableCell>
                                       </TableRow>
                                    </TableHead>
                                    <TableBody>
                                       {characters.map((project, index) => {
                                          return (
                                             <Draggable key={project.id} draggableId={String(project.id)} index={index}>
                                                {(provided) => (
                                                   <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                      <TableCell align="left">
                                                         <DragHandleIcon sx={{ color: '#807396'}}/>
                                                      </TableCell>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param1}
                                                            sx={{ fontSize: '14px', fontWeight: '400'}}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param2}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param3}
                                                            sx={{ fontSize: '14px', fontWeight: '400'}}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param4}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                         <IconButton aria-label="remove"
                                                            onClick={() => console.log('remove')}
                                                         >
                                                            <DeleteIcon />
                                                         </IconButton>
                                                      </TableCell>
                                                   </TableRow>
                                                )}
                                             </Draggable>
                                          );
                                       })}
                                    </TableBody>
                                 </Table>
                              </TableContainer>
                           )}
                        </Droppable>
                     </DragDropContext>
                  }
               </Box>

               <Box mt='30px' mb='30px' sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  {!isEditingMode &&
                     <Button variant="outlined"
                        onClick={() => handleExportFile(fetchImagesAsBlobs(imageUrls), mockedDetailsData, mockedComplectationsData)}>
                        Завантажити файл
                     </Button>
                  }

                  {isAdmin &&
                     <>
                        {!isEditingMode &&
                           <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={() => setIsEditingMode(true)}>
                              Внести зміни
                           </Button>
                        }

                        {isEditingMode &&
                           <>
                              <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={() => setIsEditingMode(false)}>
                                 Скасувати зміни
                              </Button>

                              <Button autoFocus style={{ marginLeft: '30px' }} variant="contained" onClick={openSaveDialog}>
                                 Зберегти зміни
                              </Button>
                           </>
                        }
                     </>
                  }
               </Box>

               <DialogConfirmCancel
                  isOpen={isSaveDialogOpen}
                  onClose={closeSaveDialog}
                  onCancel={closeSaveDialog}
                  onSubmit={onSave}
                  titleText="Ви впевнені, що хочете зберегти зміни в цьому файлі?"
               />

               <DialogConfirmCancel
                  isOpen={isCancelDialogOpen}
                  onClose={closeCancelDialog}
                  onCancel={closeCancelDialog}
                  onSubmit={() => navigate(`/dashboard/project/${currentProjectId}`)}
                  titleText="Ви впевнені, що хочете вийти? Зміни що ви внесли не будуть збережені."
               />
            </Box>
         }

         {!isTablet &&
            <Box sx={{ width: '70%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>

               <Box mt='15px'>
                  <Button variant="outlined"
                     startIcon={<ArrowBackIosNewIcon />}
                     onClick={() => {
                        if (isEditingMode) {
                           openCancelDialog();
                        } else navigate(`/dashboard/project/${currentProjectId}`)
                     }}
                  >
                     Назад
                  </Button>
               </Box>

               {uploadedImages.length > 0 &&
                  <SingleLineImageList images={uploadedImages} />
               }

               {uploadedImages.length === 0 &&
                  <Box marginTop='30px' sx={{ border: '2px solid #E8E8E8', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Typography textAlign='center'>Жодного фото ще не завантажено</Typography>
                  </Box>
               }

               {isEditingMode &&
                  <DropzoneWrapperStyles>
                     <DropzoneStyles {...getRootProps()}>
                        <DropzoneTextStyles style={{ marginTop: '40px' }}>
                           Перетягніть файли сюди або натисніть, щоб вибрати зображення
                        </DropzoneTextStyles>
                     </DropzoneStyles>

                     <PreviewContainerStyles>
                        <DropzoneTextStyles style={{ margin: '0', paddingLeft: '15px' }}>
                           Спершу додайте основну світлину*
                        </DropzoneTextStyles>
                        {uploadedImages.length > 0 && (
                           <Grid m='10px' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              {uploadedImages.map((image, index) => {
                                 const imageUrl = URL.createObjectURL(image);
                                 return (
                                    <Grid item key={index} sx={{ position: 'relative', marginLeft: '10px' }}>
                                       <ImageStyles src={imageUrl} alt={image.name} />
                                       <IconButton aria-label="remove"
                                          sx={{ position: 'absolute', bottom: '0px', right: '0px' }}
                                          onClick={() => handleSave(index)}
                                       >
                                          <DeleteIcon />
                                       </IconButton>
                                    </Grid>
                                 )
                              })}
                           </Grid>
                        )}
                     </PreviewContainerStyles>
                  </DropzoneWrapperStyles>
               }

               <Box mt='30px' mb='30px'>
                  <DetailsTable title='Деталі' detailsData={mockedDetailsData} />
               </Box>

               <Box mt='30px'>
                  <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Фурнітура</Typography>

                  {!isEditingMode &&
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                           <TableHead>
                              <TableRow>
                                 <TableCell align="left">Найменування</TableCell>
                                 <TableCell align="left">Код виробу</TableCell>
                                 <TableCell align="center">Кількість</TableCell>
                                 <TableCell align="center">Параметер 4</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {mockedFurnitureData.map((project, index) => (
                                 <TableRow key={project.id}>
                                    <TableCell align="left">{project.param1}</TableCell>
                                    <TableCell align="left">{project.param2}</TableCell>
                                    <TableCell align="center">{project.param3}</TableCell>
                                    <TableCell align="center">{project.param4}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  }

                  {isEditingMode &&
                     <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                           {(provided) => (
                              <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                       <TableRow>
                                          <TableCell align="left">Найменування</TableCell>
                                          <TableCell align="left">Код виробу</TableCell>
                                          <TableCell align="center">Кількість</TableCell>
                                          <TableCell align="center">Параметер 4</TableCell>
                                          <TableCell align="left">Видалення</TableCell>
                                       </TableRow>
                                    </TableHead>
                                    <TableBody>
                                       {characters.map((project, index) => {
                                          return (
                                             <Draggable key={project.id} draggableId={String(project.id)} index={index}>
                                                {(provided) => (
                                                   <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param1}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param2}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param3}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                         <InputBase
                                                            fullWidth
                                                            multiline
                                                            defaultValue={project.param4}
                                                            sx={{ fontSize: '14px', fontWeight: '400' }}
                                                         />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                         <IconButton aria-label="remove"
                                                            onClick={() => console.log('remove')}
                                                         >
                                                            <DeleteIcon />
                                                         </IconButton>
                                                      </TableCell>
                                                   </TableRow>
                                                )}
                                             </Draggable>
                                          );
                                       })}
                                    </TableBody>
                                 </Table>
                              </TableContainer>
                           )}
                        </Droppable>
                     </DragDropContext>
                  }
               </Box>

               <Box mt='30px' mb='30px' sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  {!isEditingMode &&
                     <Button variant="outlined"
                        onClick={() => handleExportFile(fetchImagesAsBlobs(imageUrls), mockedDetailsData, mockedComplectationsData)}>
                        Завантажити файл
                     </Button>
                  }

                  {isAdmin &&
                     <>
                        {!isEditingMode &&
                           <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={() => setIsEditingMode(true)}>
                              Внести зміни
                           </Button>
                        }

                        {isEditingMode &&
                           <>
                              <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={() => setIsEditingMode(false)}>
                                 Скасувати зміни
                              </Button>

                              <Button autoFocus style={{ marginLeft: '30px' }} variant="contained" onClick={openSaveDialog}>
                                 Зберегти зміни
                              </Button>
                           </>
                        }
                     </>
                  }
               </Box>

               <DialogConfirmCancel
                  isOpen={isSaveDialogOpen}
                  onClose={closeSaveDialog}
                  onCancel={closeSaveDialog}
                  onSubmit={onSave}
                  titleText="Ви впевнені, що хочете зберегти зміни в цьому файлі?"
               />

               <DialogConfirmCancel
                  isOpen={isCancelDialogOpen}
                  onClose={closeCancelDialog}
                  onCancel={closeCancelDialog}
                  onSubmit={() => navigate(`/dashboard/project/${currentProjectId}`)}
                  titleText="Ви впевнені, що хочете вийти? Зміни що ви внесли не будуть збережені."
               />
            </Box>
         }
      </>
   )
}

export default ConfigurationDetailPage;
