import React from 'react'

const Pages = ( params ) => {
    const pageNumbers = Array.from({ length: 13 }, (_, i) => i + 1);

    return (
        <>
            {pageNumbers.map((number) => (
                <div
                    className='h-40 w-40 border-4 border-gray-600 rounded-xl hover:bg-gray-600 hover:text-white flex justify-center bg-pink-300 items-center shadow-lg cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out'
                    key={number}
                    onClick={params.onClick}
                >
                    Page {number}
                </div>
            ))}
        </>
    );
}

export default Pages