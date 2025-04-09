import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const Draggable = ({ 
  page, 
  index, 
  moveCard, 
  handleDelete, 
  handlePageClick, 
  size, 
  favicons, 
  pageTitles, 
  showPageTitles, 
  showEdit 
}) => {
  const title = pageTitles[page.number] || 
                (page.url ? new URL(page.url).hostname.replace('www.', '') : '');
  const hasFavicon = page.url && favicons[page.number];

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TILE,
    item: { id: page.number, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TILE,
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (item.index === index) {
        return;
      }
    },
    drop: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
      }
    }
  });

  return showEdit ? (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative border-2 border-gray-600 rounded-xl flex justify-center items-center shadow-lg shake-animation ${isDragging ? 'opacity-50' : ''}`}
      style={{ 
        height: size, 
        width: size,
        background: hasFavicon ? `url(${favicons[page.number]}) center center/80% no-repeat` : '#f9a8d4'
      }}
    >
      <span className="bg-white/80 px-2 py-1 rounded text-sm text-center line-clamp-2">{title}</span>
      <button
        className="absolute top-1 right-1 text-red-600 cursor-pointer hover:text-xl transition duration-300 ease-in-out z-50"
        onClick={(e) => handleDelete(e, page.number)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        ✖
      </button>
    </div>
  ) : (
    <div
      className="relative border-2 border-gray-600 rounded-xl bg-white flex justify-center items-center shadow-lg cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out"
      style={{ 
        height: size, 
        width: size,
        background: hasFavicon ? `url(${favicons[page.number]}) center center/80% no-repeat` : '#f9a8d4'
      }}
      onClick={() => handlePageClick(page)}
    >
      {(showPageTitles || !hasFavicon) && (
        <span className="bg-white/80 px-2 py-1 rounded text-sm text-center line-clamp-2">
          {title}
        </span>
      )}
    </div>
  );
};

export default Draggable;