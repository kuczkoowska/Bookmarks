import React from 'react'

const ShowPopUp = ({ addPage, setShowPopup, popupInput, setPopupInput, color}) => {
    const handleAddPage = () => {
        if (popupInput) {
            addPage(popupInput);
            setPopupInput('');
            setShowPopup(false);
        }
    };

    return (
        <>
        <div className={`p-4 px-8 text-${color}`}>
                    <h2 className="font-bold mb-6 text-center">Enter the URL of the page:</h2>
                    <input
                        type="text"
                        value={popupInput}
                        onChange={(e) => setPopupInput(e.target.value)}
                        placeholder='https://example.com'
                        className="border p-2 w-[80%] mb-4 rounded-2xl flex justify-center items-center mx-auto focus:outline-none"
                    />
                    <div className='py-1 px-4 flex justify-between'>
                        <button
                            className="py-1 bg-red-500 text-white rounded-xl cursor-pointer w-[45%]"
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="py-1 bg-blue-500 text-white rounded-xl cursor-pointer w-[45%]"
                            onClick={handleAddPage}
                        >
                            Apply
                        </button>
                    </div>
                    </div>
        </>
    )
}

export default ShowPopUp