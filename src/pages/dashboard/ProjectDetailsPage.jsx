import React, { useState } from 'react'
import {
   styled,
   Typography,
   Box,
   Button,
   useMediaQuery
} from '@mui/material';
import OperationsTable from '../../components/OperationTable/index.jsx';
import DetailsTable from '../../components/DetailsTable/index.jsx';
import { mockedDetailsData, mockedOperationsData } from '../../services/mockedData.js';
import ProjectCompletionPage from './ProjectCompletionPage.jsx';

const HeaderStyle = styled('div')(() => ({
   width: "100%",
   height: '80px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   borderBottom: '2px solid #E8E5EC',
}));

const HeaderStyleMobile = styled('div')(() => ({
   width: "100%",
   /* height: '90px', */
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   borderBottom: '2px solid #E8E5EC',
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
   border: '1px solid #795EA4',
   color: '#2F2F2F',
   textTransform: 'none'
}));

const ProjectDetailsPage = () => {
   const [currentSection, setCurrentSection] = useState('Operations');
   const isDesktop = useMediaQuery('(min-width:1100px)');
   const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1100px)');
   const isMobile = useMediaQuery('(max-width:768px)');

   return (
      <>
         {isMobile &&
            <Box sx={{ width: '92%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>
               <HeaderStyleMobile>
                  <Box mb='10px' sx={{width: '92%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Typography fontSize={24} fontWeight={800}>
                        {'Назва проекту'}
                     </Typography>

                     <Box>
                        <Typography fontWeight={600} fontSize={16} color='#8A8A8A'>{`Тарас Шевченко`}</Typography>
                     </Box>
                  </Box>
                     
                  <Box mb='10px' sx={{ width: '320px', minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                     <ButtonStyle onClick={() => setCurrentSection('Operations')}>
                        Операції
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Details')}>
                        Деталі
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Equipment')}>
                        Комплектування
                     </ButtonStyle>
                  </Box>
               </HeaderStyleMobile>

               {
                  currentSection === 'Operations' &&
                  <>
                     <Box mt='30px'>
                        <OperationsTable operationsData={mockedOperationsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Details' &&
                  <>
                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Деталі в роботі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Готові деталі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Браковані деталі' detailsData={mockedDetailsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Equipment' &&
                  <>
                     <ProjectCompletionPage />
                  </>
               }

            </Box>
         }

         {isTablet &&
            <Box sx={{ width: '92%', paddingLeft: '30px', paddingRight: '30px', marginTop: '25px' }}>
               <HeaderStyle>
                  <Typography fontSize={24} fontWeight={800}>
                     {'Назва проекту'}
                  </Typography>

                  <Box sx={{ width: '320px', minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                     <ButtonStyle onClick={() => setCurrentSection('Operations')}>
                        Операції
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Details')}>
                        Деталі
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Equipment')}>
                        Комплектування
                     </ButtonStyle>
                  </Box>

                  <Box>
                     <Typography fontWeight={600} fontSize={16} color='#8A8A8A'>{`Тарас Шевченко`}</Typography>
                  </Box>
               </HeaderStyle>

               {
                  currentSection === 'Operations' &&
                  <>
                     <Box mt='30px'>
                        <OperationsTable operationsData={mockedOperationsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Details' &&
                  <>
                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Деталі в роботі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Готові деталі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Браковані деталі' detailsData={mockedDetailsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Equipment' &&
                  <>
                     <ProjectCompletionPage />
                  </>
               }

            </Box>
         }

         {isDesktop &&
            <Box sx={{ width: '70%', paddingLeft: '50px', paddingRight: '50px', marginTop: '10px' }}>
               <HeaderStyle>
                  <Typography fontSize={32} fontWeight={800}>
                     {'Назва проекту'}
                  </Typography>

                  <Box sx={{ width: '400px', minWidth: '350px', display: 'flex', justifyContent: 'space-between' }}>
                     <ButtonStyle onClick={() => setCurrentSection('Operations')}>
                        Операції
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Details')}>
                        Деталі
                     </ButtonStyle>
                     <ButtonStyle onClick={() => setCurrentSection('Equipment')}>
                        Комплектування
                     </ButtonStyle>
                  </Box>

                  <Box>
                     <Typography fontWeight={600} fontSize={16} color='#8A8A8A'>{`Тарас Шевченко`}</Typography>
                  </Box>
               </HeaderStyle>

               {
                  currentSection === 'Operations' &&
                  <>
                     <Box mt='30px'>
                        <OperationsTable operationsData={mockedOperationsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Details' &&
                  <>
                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Деталі в роботі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Готові деталі' detailsData={mockedDetailsData} />
                     </Box>

                     <Box mt='30px' mb='30px'>
                        <DetailsTable title='Браковані деталі' detailsData={mockedDetailsData} />
                     </Box>
                  </>
               }

               {
                  currentSection === 'Equipment' &&
                  <>
                     <ProjectCompletionPage />
                  </>
               }

            </Box>
         }
      </>
   )
}

export default ProjectDetailsPage;
