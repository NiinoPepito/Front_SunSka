import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/product-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Catégorie créée avec succès.');
                navigate('/categories'); // Navigate back to categories page
            } else {
                console.error('Erreur lors de la création de la catégorie.');
                // Handle error as needed
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
            // Handle error as needed
        }
    };

    const handleBack = () => {
        navigate('/categories');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nom de la catégorie
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Valider
                </button>
                <button
                    type="button"
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    onClick={handleBack}
                >
                    Retour
                </button>
            </div>
        </form>
    );
};

export default CreateCategory;
