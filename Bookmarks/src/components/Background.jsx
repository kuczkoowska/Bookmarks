import React from "react";

const Background = ( {setBackgroundImage, setShowBackground}) => {

    React.useEffect(() => {
        const savedBackground = localStorage.getItem('backgroundImage');
        if (savedBackground) {
            setBackgroundImage(savedBackground);
        }
    }, [setBackgroundImage]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const selectedImage = URL.createObjectURL(file);
            setBackgroundImage(selectedImage);
            localStorage.setItem('backgroundImage', selectedImage);
            setShowBackground(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center h-screen w-screen z-[9999]">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-6 text-center">Change Background</h2>
                <input type="file" accept="image/*" className="mb-4 hidden" id="fileInput" onChange={handleFileChange} />
                <div className="flex justify-between mt-2">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 mr-3 rounded-3xl cursor-pointer"
                        onClick={() => document.getElementById('fileInput').click()}>
                        Choose from files
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-3xl cursor-pointer"
                        onClick={() => setShowBackground(false)}>
                        Cancel
                    </button>
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <button
                        className="cursor-pointer"
                        onClick={() => { setBackgroundImage(''); setShowBackground(false); }}>
                        Set to default
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Background;