import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBuilding = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Bar', // Default type
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Building to create: ${JSON.stringify(formData)}`);
        // Here you would typically make the API call to create the building
        // After the building is created successfully, navigate to the buildings page
        navigate('/building');
    };

    const handleBack = () => {
        navigate('/building');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nom
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="Bar">Bar</option>
                    <option value="Magasin">Magasin</option>
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Créer le bâtiment
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Retour
                </button>
            </div>
        </form>
    );
};

export default CreateBuilding;
