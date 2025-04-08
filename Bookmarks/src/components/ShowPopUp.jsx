import React from 'react'

const ShowPopUp = ({ addPage, setShowPopup, popupInput, setPopupInput }) => {
    const handleAddPage = () => {
        if (popupInput) {
            addPage(popupInput);
            setPopupInput('');
            setShowPopup(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center h-screen w-screen z-[9999]">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6 text-center">Enter the URL of the page:</h2>
                    <input
                        type="text"
                        value={popupInput}
                        onChange={(e) => setPopupInput(e.target.value)}
                        className="border p-2 w-full mb-4 rounded-2xl"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-3xl cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddPage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-3xl cursor-pointer ml-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowPopUp