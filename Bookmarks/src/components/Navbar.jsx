import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import edit from '../icons/edit.png';
import user from '../icons/user.png';
import background from '../icons/background.png';
import scale from '../icons/scale.png';
import menu from '../icons/menu.png';

const Navbar = (params) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showScale, setShowScale] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const selectedImage = URL.createObjectURL(file);
            params.setBackgroundImage(selectedImage);
            setShowBackground(false);
        }
    };

    const renderBackground = () => {
        if (!showBackground) return null;

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
                            onClick={() => params.setBackgroundImage('')}>
                            Set to default
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-md p-1 m-4 rounded-xl cursor-pointer">
                <img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={{ maxWidth: '40px' }} />
            </div>

            <div className={`fixed top-0 right-0 w-md backdrop-filter backdrop-blur-md m-4 rounded-xl`}>
                <ul className="flex justify-between items-center">
                    {showMenu && (
                        <>
                            <li className="text-3xl font-bold cursor-pointer">+</li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={background} alt="background icon" style={{ maxWidth: '35px' }} onClick={() => setShowBackground(!showBackground)} />
                            </li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={scale} alt="scale icon" style={{ maxWidth: '40px' }} onClick={() => setShowScale(!showScale)} />
                            </li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={edit} alt="edit icon" style={{ maxWidth: '35px' }} onClick={() => setShowEdit(!showEdit)} />
                            </li>
                        </>
                    )}
                    <li onClick={() => navigate('/login')} className={`text-xl font-bold cursor-pointer ${showMenu ? '' : 'fixed right-0 top-0'}`}>
                        <img src={user} alt="user icon" style={{ maxWidth: '40px' }} />
                    </li>
                </ul>
            </div>

            {/* Render Background Modal Outside Navbar */}
            {renderBackground()}
        </>
    );
};

export default Navbar;
