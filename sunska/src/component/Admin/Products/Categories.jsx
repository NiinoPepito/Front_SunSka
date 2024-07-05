import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProduct, setEditingProduct] = useState({
        name: '',
        capacity: '',
        unit: '',
        isActif: true // Assuming default value
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Erreur lors de la récupération des produits.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setEditingProduct({
            name: product.name,
            capacity: product.capacity,
            unit: product.unit,
            isActif: product.isActif
        });
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingProduct),
            });
            if (response.ok) {
                console.log('Produit modifié avec succès !');
                fetchProducts(); // Re-fetch products after successful save
                setEditingProductId(null);
                setEditingProduct({
                    name: '',
                    capacity: '',
                    unit: '',
                    isActif: true
                });
            } else {
                console.error('Erreur lors de la modification du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    const handleCancel = () => {
        setEditingProductId(null);
        setEditingProduct({
            name: '',
            capacity: '',
            unit: '',
            isActif: true
        });
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}/active`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive }),
            });
            if (response.ok) {
                console.log('Statut du produit modifié avec succès !');
                fetchProducts(); // Re-fetch products after successful toggle
            } else {
                console.error('Erreur lors de la modification du statut du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Produits</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={() => navigate('/createProduit')}
                >
                    Créer un produit
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Produits</th>
                        <th className="py-2 px-4 border-b text-center">Capacité</th>
                        <th className="py-2 px-4 border-b text-center">Unité</th>
                        <th className="py-2 px-4 border-b text-center">Actif</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? 'bg-tabvertbleu' : ''}>
                            <td className="py-2 px-4 border-b text-center">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingProduct.name}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                name: e.target.value,
                                            })
                                        }
                                        onBlur={() => handleSave(product.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="capacity"
                                        value={editingProduct.capacity}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                capacity: e.target.value,
                                            })
                                        }
                                        onBlur={() => handleSave(product.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    product.capacity
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="unit"
                                        value={editingProduct.unit}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                unit: e.target.value,
                                            })
                                        }
                                        onBlur={() => handleSave(product.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    product.unit
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <div className="flex justify-center">
                                    <button
                                        className={`h-10 flex items-center ${
                                            product.isActive
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                        onClick={() => handleToggleActive(product.id, !product.isActive)}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                product.isActive
                                                    ? faToggleOn
                                                    : faToggleOff
                                            }
                                            className={
                                                product.isActive
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }
                                        />
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                                {editingProductId === product.id ? (
                                    <div className="flex justify-end items-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white h-10 px-4 rounded"
                                            onClick={() => handleSave(product.id)}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={handleCancel}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end items-center">
                                        <button
                                            className="text-white h-10 flex items-center justify-center"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-blue-600"
                                            />
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

export default Products;
