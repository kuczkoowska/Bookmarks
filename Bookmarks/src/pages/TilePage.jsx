import React from 'react';
import Navbar from '../components/Navbar';
import Tiles from '../components/Tiles';
import { useState, useEffect} from 'react';

const TilePage = () => {
  const [background, setBackground] = React.useState('');
  const [numberColumns, setNumberColumns] = React.useState(4);

  const getSavedPages = () => {
      const savedPages = localStorage.getItem('pages');
      return savedPages ? JSON.parse(savedPages) : [];
    };
  
  const [pages, setPages] = useState(getSavedPages);
  
  const onClick = (pageNumber) => {
    console.log(`Page ${pageNumber} clicked`);
  };

  useEffect(() => {
    localStorage.setItem('pages', JSON.stringify(pages));
  }, [pages]);

    
  return (
    <div
      className='flex justify-center items-center h-screen flex-col'
      style={{
        background: background ? `url(${background}) no-repeat center center/cover` : 'none',
      }}
    >
      <Navbar setBackgroundImage={setBackground} setNumberColumns={setNumberColumns} pages={pages} setPages={setPages}/>
      <Tiles onClick={onClick} columns={numberColumns} pages={pages} setPages={setPages} />
    </div>
  );
};

export default TilePage;
