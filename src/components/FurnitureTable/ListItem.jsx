import { Draggable } from "react-beautiful-dnd";
import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";

/* const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`; */

const CardHeader = {
   fontWeight: 500,
   textAlign: 'start',
}

const Author = {
   display: 'flex',
   alignItems: 'center'
}

const CardFooter = {
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center'
}

const DragItem = {
   padding: '10px',
   borderRadius: '6px',
   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
   background: 'white',
   margin: '0 0 8px 0',
   display: 'grid',
   gridGap: '20px',
   flexDirection: 'column',
}


const ListItem = ({ item, provided, snapshot }) => {

   return (
      <Box 
         sx={{...DragItem}}
         ref={provided.innerRef}
         snapshot={snapshot}
         {...provided.draggableProps}
         {...provided.dragHandleProps}
      >
         <Box style={{ ...CardHeader }}>randomHeader</Box>
         <span>{item.id}</span>
         <div style={{ ...CardFooter }}>
            <span>{item.content}</span>
            <div style={{ ...Author }}>
               {item.id}
            </div>
         </div>
      </Box>
   );
};

export default ListItem;
