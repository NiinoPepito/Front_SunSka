import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleBellClick = () => {
        alert("Icône de cloche cliquée !");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-customGreen fixed top-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-4">
                    <a href="/stock" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Stock</a>
                    <a href="/commande" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Commande</a>
                    <a href="/statistique" className="text-white hover:bg-customHover-700 px-3 py-2 rounded-md text-sm font-medium">Statistiques</a>
                    <a href="/bar" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Bar</a>
                    <a href="/magasin" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Magasin</a>
                </div>
                <div className="text-white cursor-pointer md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </div>
                <div className="text-white cursor-pointer" onClick={handleBellClick}>
                    <FaBell className="w-6 h-6" />
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-4">
                    <a href="/stock" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Stock</a>
                    <a href="/commande" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Commande</a>
                    <a href="/statistique" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Statistiques</a>
                    <a href="/bar" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Bar</a>
                    <a href="/magasin" className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">Magasin</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
