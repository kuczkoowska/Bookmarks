import React from 'react';
import Navbar from '../components/Navbar';
import Tiles from '../components/Tiles';
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TilePage = () => {
  const getSavedPages = () => {
    const savedPages = localStorage.getItem('pages');
    return savedPages ? JSON.parse(savedPages) : [];
  };

  const [background, setBackground] = useState(() => {
    return localStorage.getItem('backgroundImage') || '';
  });
  const [numberColumns, setNumberColumns] = useState(() => {
    const savedColumns = localStorage.getItem('numberColumns');
    if (!savedColumns) {
      localStorage.setItem('numberColumns', '4');
    }
    return savedColumns ? parseInt(savedColumns, 10) : 4;
  });
  const [showEdit, setShowEdit] = useState(false);
  const [pages, setPages] = useState(getSavedPages);

  const addPage = (url = null) => {
    const maxNumber = Math.max(0, ...pages.map(page => page.number));
    const newPage = {
      number: maxNumber + 1,
      url: url
    };
    setPages(prevPages => [...prevPages, newPage]);
  };

  const deletePage = (pageNumber) => {
    setPages(prevPages => {
      const updatedPages = prevPages.filter(page => page.number !== pageNumber);
      return updatedPages;
    });
  };

  useEffect(() => {
    localStorage.setItem('pages', JSON.stringify(pages));
  }, [pages]);

  return (
    <DndProvider backend={HTML5Backend}>
      {pages ? (
        <div
          className='flex justify-center items-center h-screen flex-col'
          style={{
            background: background ? `url(${background}) no-repeat center center/cover` : 'none',
          }}
        >
          <Navbar 
            setBackgroundImage={setBackground} 
            setNumberColumns={setNumberColumns} 
            pages={pages} 
            setPages={setPages} 
            showEdit={showEdit} 
            setShowEdit={setShowEdit} 
            addPage={addPage}
          />
          <Tiles 
            columns={numberColumns} 
            pages={pages} 
            setPages={setPages} 
            showEdit={showEdit} 
            setShowEdit={setShowEdit} 
            deletePage={deletePage} 
          />
        </div>
      ) : null}
    </DndProvider>
  );
};
export default TilePage;