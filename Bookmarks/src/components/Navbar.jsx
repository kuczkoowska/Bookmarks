import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import edit from '../icons/edit.png';
import user from '../icons/user.png';
import background from '../icons/background.png';
import scale from '../icons/scale.png';
import menu from '../icons/menu.png';
import ScaleSlider from './ScaleSlider';
import Background from './Background';
import ShowPopup from './ShowPopUp';

const Navbar = ({setBackgroundImage, setNumberColumns, pages, setPages, setShowEdit, showEdit, addPage }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showScale, setShowScale] = useState(false);
    const [scaleValue, setScaleValue] = useState(3);
    const [iconColor, setIconColor] = useState(() => {
        localStorage.getItem('iconColor') || 'black';
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupInput, setPopupInput] = useState('');

    const navigate = useNavigate();

    const calculateBackgroundBrightness = () => {
        const backgroundImage = localStorage.getItem('backgroundImage');
        if (!backgroundImage) return;

        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r, g, b, avg;
            let colorSum = 0;

            for(let x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];

                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }

            const brightness = Math.floor(colorSum / (img.width * img.height));
            setIconColor(brightness < 128 ? 'white' : 'black');
            localStorage.setItem('iconColor', brightness < 128 ? 'white' : 'black');
        };
    };

    useEffect(() => {
        calculateBackgroundBrightness();
    }, [showBackground]);

    const iconStyle = {
        maxWidth: '40px',
        filter: iconColor === 'white' ? 'invert(1)' : 'none'
    };


    return (
        <>
            <div className="fixed top-0 left-0 w-md p-1 m-4 rounded-xl cursor-pointer">
                <img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={iconStyle} />
            </div>

            <div className={`fixed top-0 right-0 w-md backdrop-filter backdrop-blur-md m-4 rounded-xl`}>
                <ul className="flex justify-between items-center relative ml-6"> 
                    {showMenu && (
                        <>
                            <li className={`text-3xl font-bold cursor-pointer`} 
                                style={{color: iconColor}}
                                onClick={() => setShowPopup(true)}>+</li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={background} alt="background icon" style={iconStyle} onClick={() => setShowBackground(!showBackground)} />
                            </li>
                            <li className="text-xl font-bold cursor-pointer relative">
                                <img src={scale} alt="scale icon" style={iconStyle} onClick={() => setShowScale(!showScale)} />
                            </li>
                            <li className="text-xl font-bold cursor-pointer">
                                <img src={edit} alt="edit icon" style={iconStyle} onClick={() => setShowEdit(!showEdit)} />
                            </li>
                        </>
                    )}
                    <li onClick={() => navigate('/login')} className={`text-xl font-bold cursor-pointer ${showMenu ? '' : 'fixed right-0 top-0'}`}>
                        <img src={user} alt="user icon" style={iconStyle} />
                    </li>
                </ul>
            </div>

            {showPopup && (
                <ShowPopup
                setShowPopup={setShowPopup}
                addPage={addPage}
                popupInput={popupInput}
                setPopupInput={setPopupInput}
                />
            )}

            {showBackground && (
                <Background
                    setBackgroundImage={setBackgroundImage}
                    setShowBackground={setShowBackground}
                />
            )}
            {showScale && (
                <ScaleSlider
                    scaleValue={scaleValue}
                    setScaleValue={setScaleValue}
                    setNumberColumns={setNumberColumns}
                    setShowScale={setShowScale}
                />
            )}
        </>
    );
};

export default Navbar;
