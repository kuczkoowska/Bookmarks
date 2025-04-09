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

const Navbar = ({ setBackgroundImage, setNumberColumns, pages, setPages, setShowEdit, showEdit, addPage }) => {
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
        if (!backgroundImage) {
            setIconColor('black');
            localStorage.setItem('iconColor', 'black');
            return;
        }

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

            for (let x = 0, len = data.length; x < len; x += 4) {
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

    const menuStyle = {
        transform: showMenu ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
    };


    const menuItems = [
        {
            label: "Add new page",
            onClick: () => setShowPopup(!showPopup),
            extra: <p className='text-3xl'>+</p>,
            add: showPopup && (
                <li>
                    <ShowPopup
                        setShowPopup={setShowPopup}
                        addPage={addPage}
                        popupInput={popupInput}
                        setPopupInput={setPopupInput}
                        color={iconColor}
                    />
                </li>
            )
        },
        {
            icon: background,
            label: "Change background",
            onClick: () => setShowBackground(!showBackground),
        },
        {
            icon: scale,
            label: "Resize",
            onClick: () => setShowScale(!showScale),
            add: showScale && (
                <li>
                <ScaleSlider
                    scaleValue={scaleValue}
                    setScaleValue={setScaleValue}
                    setNumberColumns={setNumberColumns}
                    setShowScale={setShowScale}
                    color={iconColor}
                />
                </li>
            )
        },
        {
            icon: edit,
            label: "Edit",
            onClick: () => setShowEdit(!showEdit),
        },
    ];

    return (
        <>
            <div className="fixed top-0 left-0 w-md p-1 m-4 rounded-xl cursor-pointer">
                <img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={iconStyle} />
            </div>

            <div className="fixed top-0 left-0 h-full w-[20%]" style={menuStyle}>
                <ul className="flex flex-col">
                    <li className='text-xl font-bold cursor-pointer p-6'>
                        <img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={iconStyle} />
                    </li>
                    {menuItems.map((item, index) => (
                        <>
                            <li
                                key={index}
                                className="text-xl font-bold cursor-pointer flex items-center gap-6 hover:bg-black/10 pl-6 py-6"
                                style={{ color: iconColor }}
                                onClick={item.onClick}
                            >
                                {item.icon && (<img src={item.icon} alt={`${item.label} icon`} style={iconStyle} />)}
                                {item.extra && item.extra}
                                <p>{item.label}</p>
                            </li>
                            {item.add && item.add}
                        </>
                    ))}
                </ul>
            </div>

            <div className="fixed top-0 right-0 p-1 m-4 rounded-xl cursor-pointer">
                <img src={user} alt="user icon" style={iconStyle} onClick={() => navigate('/login')} />
            </div>

            {showBackground && (
                <Background
                    setBackgroundImage={setBackgroundImage}
                    setShowBackground={setShowBackground}
                />
            )}
        </>
    );
};

export default Navbar;
