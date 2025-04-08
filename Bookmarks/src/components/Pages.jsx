import React from 'react';

const Pages = (params) => {
  const cols = params.columns || 1;
  const size = `calc(var(--spacing) * ${Math.max(30, 160 / cols)})`;

  const handlePageClick = (page) => {
    if (page.url) {
      window.open(page.url, '_blank');
    } else {
      console.log(`Navigate to page ${page.number}`);
    }
  };

  return (
    <>
      {params.pages.map((page, index) => {
        const title = page.url ? new URL(page.url).hostname.replace('www.', '') : `Page ${page.number}`;
        return params.showEdit ? (
          <div
            key={page.number}
            className="relative border-4 border-gray-600 rounded-xl flex justify-center bg-pink-300 items-center shadow-lg"
            style={{ height: size, width: size }}
          >
            {title}
            <div
              className="absolute top-1 right-1 text-red-600 cursor-pointer hover:text-xl transition duration-300 ease-in-out hover:transform cursor-pointer"
              onClick={() => params.deletePage(page.number)}
            >
              ✖
            </div>
          </div>
        ) : (
          <div
            key={page.number}
            className="relative border-4 border-gray-600 rounded-xl hover:bg-gray-600 hover:text-white flex justify-center bg-pink-300 items-center shadow-lg cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => handlePageClick(page)}
            style={{ height: size, width: size }}
          >
            {title}
          </div>
        );
      })}
    </>
  );
};

export default Pages;
