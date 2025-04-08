import React from 'react';
import Navbar from '../components/Navbar';
import Tiles from '../components/Tiles';
import { useState, useEffect} from 'react';

const TilePage = () => {
  const [background, setBackground] = useState(() => {
    return localStorage.getItem('backgroundImage') || '';
  });
  const [numberColumns, setNumberColumns] = useState(4);
  const [showEdit, setShowEdit] = useState(false);
  

  const getSavedPages = () => {
      const savedPages = localStorage.getItem('pages');
      return savedPages ? JSON.parse(savedPages) : [];
    };
  
  const [pages, setPages] = useState(getSavedPages);
  
  useEffect(() => {
    localStorage.setItem('pages', JSON.stringify(pages));
  }, [pages]);

  const deletePage = (pageNumber) => {
    const updatedPages = pages.filter((page) => page.number !== pageNumber);
    setPages(updatedPages);
  };

    
  return (
    <div
      className='flex justify-center items-center h-screen flex-col'
      style={{
        background: background ? `url(${background}) no-repeat center center/cover` : 'none',
      }}
    >
      <Navbar setBackgroundImage={setBackground} setNumberColumns={setNumberColumns} pages={pages} setPages={setPages} showEdit={showEdit} setShowEdit={setShowEdit}/>
      <Tiles columns={numberColumns} pages={pages} setPages={setPages} showEdit={showEdit} setShowEdit={setShowEdit} deletePage={deletePage}/>
    </div>
  );
};

export default TilePage;
