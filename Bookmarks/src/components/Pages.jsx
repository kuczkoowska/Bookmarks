import React, { useState, useEffect } from 'react';

const Pages = (params) => {
  const cols = params.columns || 1;
  const size = `calc(var(--spacing) * ${Math.max(30, 160 / cols)})`;
  const [favicons, setFavicons] = useState({});
  const [pageTitles, setPageTitles] = useState({});

  const handlePageClick = (page) => {
    if (page.url) {
      window.open(page.url, '_blank', 'noopener,noreferrer');
    }
  };
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

  return (
    <>
      {params.pages.map((page, index) => {
        const title = pageTitles[page.number] || 
                     (page.url ? new URL(page.url).hostname.replace('www.', '') : `Page ${page.number}`);
        return params.showEdit ? (
          <div
            key={page.number}
            className="relative border-4 border-gray-600 rounded-xl flex justify-center bg-pink-300 items-center shadow-lg"
            style={{ 
              height: size, 
              width: size,
              background: page.url ? `url(${favicons[page.number]}) center center/contain no-repeat, #f9a8d4` : '#f9a8d4'
            }}
          >
            <span className="bg-white/80 px-2 py-1 rounded text-sm text-center line-clamp-2">{title}</span>
            <div
              className="absolute top-1 right-1 text-red-600 cursor-pointer hover:text-xl transition duration-300 ease-in-out hover:transform"
              onClick={() => params.deletePage(page.number)}
            >
              ✖
            </div>
          </div>
        ) : (
          <div
            key={page.number}
            className="relative border-4 border-gray-600 rounded-xl hover:bg-gray-600 flex justify-center items-center shadow-lg cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out"
            style={{ 
              height: size, 
              width: size,
              background: page.url ? `url(${favicons[page.number]}) center center/contain no-repeat, #f9a8d4` : '#f9a8d4'
            }}
            onClick={() => handlePageClick(page)}
          >
            <span className="bg-white/80 px-2 py-1 rounded text-sm text-center line-clamp-2">{title}</span>
          </div>
        );
      })}
    </>
  );
};

export default Pages;