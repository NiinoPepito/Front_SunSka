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
    const isAdminShop = userRole === 'ADMIN' && userBuilding.type === 'SHOP';
    const isAdminBar = userRole === 'ADMIN' && userBuilding.type === 'BAR';
    const isUserBar = userRole === 'USER' && userBuilding.type === 'BAR';
    const isGlobalAdmin = userRole === 'GLOBALADMIN';

    return (
        <nav className="bg-vertbleu top-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-4">
                    {isGlobalAdmin && (
                        <>
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
                                to="/produit"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Produit
                            </NavLink>
                            <NavLink
                                to="/compte"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Compte
                            </NavLink>
                            <NavLink
                                to="/buildings"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Bâtiments
                            </NavLink>
                        </>
                    )}

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
                            <NavLink
                                to="/seuilalerte"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Alerte
                            </NavLink>
                            <NavLink
                                to="/commandes"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Commandes
                            </NavLink>
                        </>
                    )}

                    {/* Condition pour les liens spécifiques à l'Admin */}
                    {isAdminShop && (
                        <>
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
                                to="/barlist"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Liste des Bars
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
                            <NavLink
                                to="/statistiques"
                                className="text-white hover:bg-orange px-3 py-2 rounded-md text-sm font-medium"
                                activeClassName="bg-orange"
                                onClick={toggleMenu}
                                exact
                            >
                                Statistiques
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
                {isAdminShop && (
                    <div className="text-white cursor-pointer" onClick={handleBellClick}>
                        <FaBell className="w-6 h-6" />
                    </div>
                )}
                {isAdminBar && (
                    <div className="text-white cursor-pointer" onClick={handleBellClick}>
                        <FaBell className="w-6 h-6" />
                    </div>
                )}
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
