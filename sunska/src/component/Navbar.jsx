import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleBellClick = () => {
        alert("Icône de cloche cliquée !");
    };

    // Récupération du rôle utilisateur depuis le localStorage
    const userRole = JSON.parse(localStorage.getItem('userRole'));
    const userBuilding = JSON.parse(localStorage.getItem('userBuilding'));

    // Déterminer le type d'utilisateur
    const isAdminShop = userRole === 'Admin' || (userBuilding && userBuilding.type === 'SHOP');
    const isAdminBar = userRole === 'Admin' && (userBuilding && userBuilding.type === 'BAR');
    const isUserBar = userRole === 'USER' || (userBuilding && userBuilding.type === 'BAR');

    return (
        <nav className="bg-vertbleu top-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-4">
                    {/* Liens communs à tous */}
                    {isAdminBar && (
                        <>
                            <NavLink
                                to="/stockbar"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Stock
                            </NavLink>
                        </>
                    )}

                    {/* Condition pour les liens spécifiques à l'Admin */}
                    {isAdminShop && (
                        <>
                            <NavLink
                                to="/commandes"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Commandes
                            </NavLink>
                            <NavLink
                                to="/statistiques"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Statistiques
                            </NavLink>
                            <NavLink
                                to="/magasin"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Magasin
                            </NavLink>
                            <NavLink
                                to="/produit"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Produit
                            </NavLink>
                        </>
                    )}

                    {/* Lien pour déconnexion accessible à tous */}
                    <NavLink
                        to="/"
                        className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                        activeClassName="bg-orange"
                        onClick={toggleMenu}
                        exact
                    >
                        Déconnexion
                    </NavLink>

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
                    {/* Liens communs à tous pour mobile */}
                    <NavLink
                        to="/stockbar"
                        className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                        activeClassName="bg-orange"
                        onClick={toggleMenu}
                        exact
                    >
                        Stock
                    </NavLink>

                    {/* Condition pour les liens spécifiques à l'Admin pour mobile */}
                    {isAdminShop && (
                        <>
                            <NavLink
                                to="/commandes"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Commandes
                            </NavLink>
                            <NavLink
                                to="/statistiques"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Statistiques
                            </NavLink>
                            <NavLink
                                to="/magasin"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Magasin
                            </NavLink>
                            <NavLink
                                to="/produit"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Produit
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
