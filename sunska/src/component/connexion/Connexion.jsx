import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Connexion.css";

const Connexion = () => {
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // State pour gérer la visibilité du mot de passe
    const [error, setError] = useState(null); // State pour gérer les erreurs de connexion

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                const data = await response.json();
                if (data.id == null) {
                    setError('Login ou mot de passe incorrect.');
                } else {
                    console.log('Login successful:', data);
                    localStorage.setItem('userId', JSON.stringify(data.id));
                    localStorage.setItem('userLogin', JSON.stringify(data.login));
                    localStorage.setItem('userName', JSON.stringify(data.name));
                    localStorage.setItem('userRole', JSON.stringify(data.role));
                    localStorage.setItem('userBuilding', JSON.stringify(data.building));
                    // TODO : redirect vers les routes suivant le role
                    if (data.role === "ADMIN" && data.building.type === "BAR") {
                        navigate('/commandes');
                    }
                    if (data.role === "USER" && data.building.type === "BAR") {
                        navigate('/stockbar');
                    }
                    if (data.role === "ADMIN" && data.building.type === "SHOP") {
                        navigate('/magasin');
                    }
                    if (data.role === "GLOBALADMIN") {
                        navigate('/statistiques');
                    }

                }
            } else {
                setError('Erreur lors de la connexion. Veuillez réessayer.');
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la connexion.');
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="z-50">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="login" className="font-bold mb-2">Identifiant</label>
                <input
                    placeholder="Identifiant"
                    type="text"
                    id="login"
                    required
                    className="rounded-lg mb-4 p-2"
                    value={loginData.login}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="font-bold mb-2">Mot de passe</label>
                <div className="relative mb-4">
                    <input
                        placeholder="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        required
                        className="rounded-lg p-2 pr-10" // Ajout de la classe pr-10 pour le padding droit
                        value={loginData.password}
                        onChange={handleChange}
                    />
                    {/* Bouton pour afficher/masquer le mot de passe */}
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 py-1 bg-gray-300 text-gray-600 rounded-r-lg"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Masquer" : "Afficher"}
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <button type="submit" className="bg-bleugris hover:bg-bleugris text-white font-bold py-2 px-4 rounded w-min self-end">
                    Connexion
                </button>
            </form>
        </div>
    );
};

export default Connexion;
