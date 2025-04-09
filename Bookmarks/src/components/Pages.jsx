import React, { useState, useEffect } from 'react';
import '../styles/shake.css';
import Draggable from './Draggable';

const Pages = (params) => {
  const cols = params.columns;
  const size = `calc(var(--spacing) * ${Math.max(30, 160 / cols)})`;
  const [favicons, setFavicons] = useState({});
  const [pageTitles, setPageTitles] = useState({});
  const [showPageTitles, setShowPageTitles] = useState(false);

  const fetchPageTitle = async (url) => {
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const html = data.contents;
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error fetching page title:', error);
      return null;
    }
  };

  useEffect(() => {
    params.pages.forEach(async page => {
      if (page.url) {
        try {
          const url = new URL(page.url);
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`;
          setFavicons(prev => ({
            ...prev,
            [page.number]: faviconUrl
          }));

          const title = await fetchPageTitle(page.url);
          if (title) {
            setPageTitles(prev => ({
              ...prev,
              [page.number]: title
            }));
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  }, [params.pages]);

  const handleDelete = (e, pageNumber) => {
    e.preventDefault();
    e.stopPropagation();
    if (params.deletePage) {
      params.deletePage(pageNumber);
    }
  };

  const handlePageClick = (page) => {
    if (page.url) {
      window.open(page.url, '_blank', 'noopener,noreferrer');
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedPage = params.pages[dragIndex];
    const newPages = [...params.pages];
    newPages.splice(dragIndex, 1);
    newPages.splice(hoverIndex, 0, draggedPage);
    params.setPages(newPages);
  };

  return (
    <>
      {params.pages?.map((page, index) => (
        <Draggable
          key={page.number}
          page={page}
          index={index}
          moveCard={moveCard}
          handleDelete={handleDelete}
          handlePageClick={handlePageClick}
          size={size}
          favicons={favicons}
          pageTitles={pageTitles}
          showPageTitles={showPageTitles}
          showEdit={params.showEdit}
        />
      ))}
    </>
  );
};

export default Pages;