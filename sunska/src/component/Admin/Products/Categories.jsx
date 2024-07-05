import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({
        name: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/product-category');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error('Erreur lors de la récupération des catégories.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategoryId(category.id);
        setEditingCategory({
            name: category.name
        });
    };

    const handleSaveCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product-category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingCategory.name
                })
            });
            if (response.ok) {
                setCategories(categories.map(category =>
                    category.id === id ? { ...category, name: editingCategory.name } : category
                ));
                setEditingCategoryId(null);
                setEditingCategory({ name: '' });
                console.log('Catégorie mise à jour avec succès.');
            } else {
                console.error('Erreur lors de la mise à jour de la catégorie.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    const handleCancelCategory = () => {
        setEditingCategoryId(null);
        setEditingCategory({ name: '' });
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product-category/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCategories(categories.filter(category => category.id !== id));
                console.log('Catégorie supprimée avec succès.');
            } else {
                console.error('Erreur lors de la suppression de la catégorie.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Catégories</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={() => navigate('/createCategorie')}
                >
                    Créer une catégorie
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Catégorie</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">
                                {editingCategoryId === category.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingCategory.name}
                                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                                        onBlur={() => handleSaveCategory(category.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                                {editingCategoryId === category.id ? (
                                    <div className="flex justify-end items-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white h-10 px-4 rounded"
                                            onClick={() => handleSaveCategory(category.id)}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={handleCancelCategory}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end items-center">
                                        <button
                                            className="text-white h-10 flex items-center justify-center"
                                            onClick={() => handleEditCategory(category)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-600"/>
                                        </button>
                                        <button
                                            className="text-white h-10 flex items-center justify-center ml-2"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} className="text-red-600"/>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
