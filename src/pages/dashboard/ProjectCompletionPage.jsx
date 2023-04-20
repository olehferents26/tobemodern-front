import React, { useState } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material';
import Header from '../../components/Header'
import SingleLineImageList from '../../components/ImageList'
import { mockedDetailsData} from '../../services/mockedData'

import { useDropzone } from 'react-dropzone';
import DetailsTable from '../../components/DetailsTable';

const thumbsContainer = {
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
   marginTop: 16
};

const ImageStyles = styled('img')(({ theme }) => ({
   width: '100px',
   height: '100px',
   objectFit: 'contain'
}));

const ProjectCompletionPage = () => {
   const [uploadedImages, setUploadedImages] = useState([]);
   console.log(uploadedImages)

   const handleRemove = (index) => {
      setUploadedImages((prevImages) =>
         prevImages.filter((image, i) => i !== index)
      );
   };

   const { getRootProps, getInputProps } = useDropzone({
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
      <Box>
         <Header />

         <SingleLineImageList images={uploadedImages} />

         <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
               <input {...getInputProps()} />
               <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
               {uploadedImages.length > 0 && (
                  <>
                     {uploadedImages.map((image, index) => {
                        const imageUrl = URL.createObjectURL(image);
                        return (
                           <div key={index} style={{ position: 'relative' }}>
                              <ImageStyles src={imageUrl} alt={image.name} />
                              <button
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(index);
                                 }}
                              >
                                 remove
                              </button>
                           </div>
                        )
                     })}
                  </>
               )}
            </aside>
         </section>

         <Box mt='30px' mb='30px'>
            <DetailsTable title='Деталі' detailsData={mockedDetailsData} />
         </Box>
      </Box>
   )
}

export default ProjectCompletionPage
