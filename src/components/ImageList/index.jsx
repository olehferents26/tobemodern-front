import React from 'react';
import { styled } from '@mui/material';
import { ImageList } from '@mui/material';

const WrapperStyles = styled('div')(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
   overflow: 'hidden',
   backgroundColor: theme.palette.background.paper,
}));

const ImageListStyles = styled(ImageList)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'nowrap',
   transform: 'translateZ(0)',
}));

const ImageStyles = styled('img')(({ theme }) => ({
   width: '300px',
   height: '200px',
   objectFit: 'contain'
}));

const SingleLineImageList = (props) => {
   const { images } = props;

   return (
      <WrapperStyles>
         <ImageListStyles>
            {images.map((image, index) => {
               const imageUrl = URL.createObjectURL(image);
               return (
                  <div key={index}>
                     <ImageStyles src={imageUrl} alt={image.name} />
                  </div>
               )
            })}
         </ImageListStyles>
      </WrapperStyles>
   );
}

export default SingleLineImageList;
