import React from "react";

const Background = ({ setBackgroundImage, setShowBackground, color}) => {

    React.useEffect(() => {
        const savedBackground = localStorage.getItem('backgroundImage');
        if (savedBackground) {
            setBackgroundImage(savedBackground);
        }
    }, [setBackgroundImage]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const selectedImage = reader.result;
                setBackgroundImage(selectedImage);
                localStorage.setItem('backgroundImage', selectedImage);
                setShowBackground(false);
            };
        }
    };

    return (
        <div className={`p-4 px-8 text-${color}`}>
                <h2 className="text-xl font-bold mb-6 text-center">Change Background</h2>
                <input type="file" accept="image/*" className="mb-4 hidden" id="fileInput" onChange={handleFileChange} />
                <div 
                    className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4 text-center cursor-pointer"
                    onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                                const selectedImage = reader.result;
                                setBackgroundImage(selectedImage);
                                localStorage.setItem('backgroundImage', selectedImage);
                                setShowBackground(false);
                            };
                        }
                    }}
                    onDragOver={(event) => event.preventDefault()}
                >
                    Drag and drop an image here or click "Choose from files"
                </div>
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
                        onClick={() => { 
                            setBackgroundImage(''); 
                            localStorage.removeItem('backgroundImage'); 
                            setShowBackground(false); 
                        }}>
                        Set to default
                    </button>
                </div>
        </div>
    );
};

export default Background;
