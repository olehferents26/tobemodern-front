import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css'

const finalSpaceCharacters = [
   {
      id: 'gary',
      name: 'Gary Goodspeed',
      thumb: ''
   },
   {
      id: 'cato',
      name: 'Little Cato',
      thumb: ''
   },
   {
      id: 'kvn',
      name: 'KVN',
      thumb: ''
   },
   {
      id: 'mooncake',
      name: 'Mooncake',
      thumb: ''
   },
   {
      id: 'quinn',
      name: 'Quinn Ergon',
      thumb: ''
   }
]

const TouchTable = () => {
   const [characters, updateCharacters] = useState(finalSpaceCharacters);

   function handleOnDragEnd(result) {
      if (!result.destination) return;

      const items = Array.from(characters);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      updateCharacters(items);
   }

   return (
      <div className="App">
         <header className="App-header">
            <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="characters">
                  {(provided) => (
                     <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                        {characters.map(({ id, name, thumb }, index) => {
                           return (
                              <Draggable key={id} draggableId={id} index={index}>
                                 {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                       <div className="characters-thumb">
                                          <img src={thumb} alt={`${name} Thumb`} />
                                       </div>
                                       <p>
                                          {name}
                                       </p>
                                    </li>
                                 )}
                              </Draggable>
                           );
                        })}
                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </DragDropContext>
         </header>
      </div>
   );
}

export default TouchTable;
