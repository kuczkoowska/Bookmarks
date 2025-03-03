import React from 'react'

const Pages = (params) => {
    const pageNumbers = Array.from({ length: 13 }, (_, i) => i + 1);

    const cols = params.columns || 1;
    const size = `calc(var(--spacing) * ${Math.max(30, 160 / cols)})`;

    return (
        <>
            {pageNumbers.map((number) => (
                <div
                    className='border-4 border-gray-600 rounded-xl hover:bg-gray-600 hover:text-white flex justify-center bg-pink-300 items-center shadow-lg cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out'
                    key={number}
                    onClick={params.onClick}
                    style={{ height: `${size}`, width: `${size}` }}
                >
                    Page {number}
                </div>
            ))}
        </>
    );
}

export default Pages