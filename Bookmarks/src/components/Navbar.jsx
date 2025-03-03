import React from 'react'
import { useState } from 'react'
import edit from '../icons/edit.png'
import user from '../icons/user.png'
import background from '../icons/background.png'
import scale from '../icons/scale.png'
import menu from '../icons/menu.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <div className="fixed top-0 left-0 w-md bg-white p-1 m-4 rounded-xl"><img src={menu} alt="menu icon" onClick={() => setShowMenu(!showMenu)} style={{ maxWidth: '40px' }} /></div>
            <div className={`fixed top-0 right-0 w-md bg-white m-4 rounded-xl`}>
                <ul className="flex justify-between items-center">
                {showMenu && (
                    <>
                        <li className="text-3xl font-bold">+</li>
                        <li className="text-xl font-bold"><img src={background} alt="background icon" style={{ maxWidth: '40px' }} /></li>
                        <li className="text-xl font-bold"><img src={scale} alt="scale icon" style={{ maxWidth: '40px' }} /></li>
                        <li className="text-xl font-bold"><img src={edit} alt="edit icon" style={{ maxWidth: '40px' }} /></li>
                    </>
                )}
                    <li onClick={() => navigate('/login')} className={`text-xl font-bold ${showMenu ? '' : 'fixed right-0 top-0 m-4' }`}><img src={user} alt="user icon" style={{ maxWidth: '40px' }} /></li>
                </ul>
            </div>
        </>
    )
}


export default Navbar