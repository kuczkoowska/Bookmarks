import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import edit from '../icons/edit.png';
import user from '../icons/user.png';
import background from '../icons/background.png';
import scale from '../icons/scale.png';
import menu from '../icons/menu.png';
import ScaleSlider from './ScaleSlider';
import Background from './Background';

const Navbar = (params) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showScale, setShowScale] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [scaleValue, setScaleValue] = useState(3);

    const navigate = useNavigate();


    return (
        <>
            <div className="fixed top-0 left-0 w-md p-1 m-4 rounded-xl cursor-pointer">
                <img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={{ maxWidth: '40px' }} />
            </div>

            <div className={`fixed top-0 right-0 w-md backdrop-filter backdrop-blur-md m-4 rounded-xl`}>
                <ul className="flex justify-between items-center relative">
                    {showMenu && (
                        <>
                            <li className="text-3xl font-bold cursor-pointer">+</li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={background} alt="background icon" style={{ maxWidth: '35px' }} onClick={() => setShowBackground(!showBackground)} />
                            </li>
                            <li className="text-xl font-bold cursor-pointer relative">
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

            {showBackground && (
                <Background
                setBackgroundImage={params.setBackgroundImage} 
                setShowBackground={setShowBackground} 
            />
            )}
            {showScale && (
                <ScaleSlider
                    scaleValue={scaleValue}
                    setScaleValue={setScaleValue}
                    setNumberColumns={params.setNumberColumns}
                    setShowScale={setShowScale}
                />
            )}
        </>
    );
};

export default Navbar;
