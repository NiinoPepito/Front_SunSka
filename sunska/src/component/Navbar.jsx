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

    const routes = {
        stockBar: {
            name: 'Stock',
            path: '/stockbar'},
        commandes: {
            name: 'Commandes',
            path: '/commandes'},
        stats: {
            name: 'Statistiques',
            path: '/statistiques'},
        bar: {
            name: 'Bar',
            path: '/bar'},
        magasin: {
            name: 'Magasin',
            path: '/magasin'},
        produit: {
            name: 'Produit',
            path: '/produit'},
        compte: {
            name: 'Compte',
            path: '/compte'},
    }

    return (
        <nav className="bg-customGreen top-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-4">
                    <a href={routes.stockBar.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.stockBar.name}</a>
                    <a href={routes.commandes.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.commandes.name}</a>
                    <a href={routes.stats.path} className="text-white hover:bg-customHover-700 px-3 py-2 rounded-md text-sm font-medium">{routes.stats.name}</a>
                    <a href={routes.bar.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.bar.name}</a>
                    <a href={routes.magasin.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.magasin.name}</a>
                    <a href={routes.produit.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.produit.name}</a>
                    <a href={routes.compte.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.compte.name}</a>
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
                    <a href={routes.magasin.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.stockBar.name}</a>
                    <a href={routes.commandes.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.commandes.name}</a>
                    <a href={routes.stats.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.stats.name}</a>
                    <a href={routes.bar.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.bar.name}</a>
                    <a href={routes.magasin.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.magasin.name}</a>
                    <a href={routes.produit.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.produit.name}</a>
                    <a href={routes.compte.path} className="text-white hover:bg-customHover px-3 py-2 rounded-md text-sm font-medium">{routes.compte.name}</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
