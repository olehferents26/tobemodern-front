import React, { useEffect, useState } from 'react'
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
   Button
} from '@mui/material'
import { styled } from '@mui/material';
import { useSelector } from 'react-redux'
import SingleLineImageList from '../../components/ImageList'
import { mockedComplectationsData, mockedDetailsData } from '../../services/mockedData'
import { useDropzone } from 'react-dropzone';
import DetailsTable from '../../components/DetailsTable';
import DeleteIcon from '../../icons/DeleteIcon';
import { useIsAdmin } from '../../hooks/useIsAdmin.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DialogConfirmCancel from '../../components/DialogConfirmCancel';
import { useNavigate } from 'react-router-dom';

const DropzoneWrapperStyles = styled('div')(({ theme }) => ({
   width: '100%',
   minHeight: '220px',
   border: '2px solid #E8E8E8',
   borderRadius: '6px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center'
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
   marginTop: '40px'
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

   const [uploadedImages, setUploadedImages] = useState([]);
   const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
   const currentProjectId = useSelector(state => state.project.currentProjectId);

   const openRemoveDialog = () => setIsRemoveDialogOpen(true)

   const closeRemoveDialog = () => setIsRemoveDialogOpen(false)

   const onRemove = () => {
      closeRemoveDialog()
   }

   const handleRemove = (index) => {
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

   return (
      <Box sx={{ width: '70%', paddingLeft: '72px', paddingRight: '72px', marginTop: '25px' }}>

         <Box mt='15px'>
            <Button variant="outlined"
               startIcon={<ArrowBackIosNewIcon />}
               onClick={() => navigate(`/dashboard/project/${currentProjectId}`)}
            >
               Назад
            </Button>
         </Box>


         <SingleLineImageList images={uploadedImages} />

         {isAdmin &&
            <DropzoneWrapperStyles>
               <DropzoneStyles {...getRootProps()}>
                  <DropzoneTextStyles>Перетягніть файли сюди або натисніть, щоб вибрати зображення</DropzoneTextStyles>
               </DropzoneStyles>

               <PreviewContainerStyles>
                  {uploadedImages.length > 0 && (
                     <Grid m='10px' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {uploadedImages.map((image, index) => {
                           const imageUrl = URL.createObjectURL(image);
                           return (
                              <Grid item key={index} sx={{ position: 'relative' }}>
                                 <ImageStyles src={imageUrl} alt={image.name} />
                                 <IconButton aria-label="remove"
                                    sx={{ position: 'absolute', bottom: '0px', right: '0px' }}
                                    onClick={() => handleRemove(index)}
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

            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Параметер 1</TableCell>
                        <TableCell align="left">Параметер 2</TableCell>
                        <TableCell align="left">Параметер 3</TableCell>
                        <TableCell align="left">Параметер 4</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {mockedComplectationsData.map((project, index) => (
                        <TableRow key={project.id}>
                           {!isAdmin &&
                              <>
                                 <TableCell align="left">{project.param1}</TableCell>
                                 <TableCell align="left">{project.param2}</TableCell>
                                 <TableCell align="left">{project.param3}</TableCell>
                                 <TableCell align="left">{project.param4}</TableCell>
                              </>
                           }

                           {isAdmin &&
                              <>
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
                              </>
                           }
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Box>

         <Box mt='30px' mb='30px' sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined">
               Завантажити файл
            </Button>

            {isAdmin &&
               <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={openRemoveDialog}>
                  Зберегти зміни
               </Button>
            }
         </Box>

         <DialogConfirmCancel
            isOpen={isRemoveDialogOpen}
            onClose={closeRemoveDialog}
            onCancel={closeRemoveDialog}
            onSubmit={onRemove}
            titleText="Ви впевнені, що хочете зберегти зміни в цьому файлі?"
         />
      </Box>
   )
}

export default ConfigurationDetailPage;
