import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
    });

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
            const response = await fetch(`http://localhost:8080/users/${id}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Password updated successfully');
                navigate('/compte');
            } else {
                console.error('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const handleBack = () => {
        navigate('/compte'); // Navigate back to the accounts page
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Modifier
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleBack}
                >
                    Retour
                </button>
            </div>
        </form>
    );
};

export default UpdatePassword;
