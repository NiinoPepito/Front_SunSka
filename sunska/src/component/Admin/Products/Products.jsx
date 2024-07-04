// Products.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CreateProducts from './CreateProducts';
import UpdateProduct from "./UpdateProducts";

const Products = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const initialProducts = [
        { id: 1, name: 'Produit A', stockBar: 10, stockMagasin: 20, reassort: 0, capacity: 500, unit: 'ml', pallets: 2 },
        { id: 2, name: 'Produit B', stockBar: 15, stockMagasin: 25, reassort: 0, capacity: 1, unit: 'L', pallets: 3 },
        { id: 3, name: 'Produit C', stockBar: 20, stockMagasin: 30, reassort: 0, capacity: 250, unit: 'ml', pallets: 1 },
        // Ajoutez plus de produits ici
    ];

    const [products, setProducts] = useState(initialProducts);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProduct, setEditingProduct] = useState({
        name: '',
        capacity: '',
        unit: '',
        pallets: ''
    });

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setEditingProduct({
            name: product.name,
            capacity: product.capacity,
            unit: product.unit,
            pallets: product.pallets
        });
    };

    const handleCreateProductClick = () => {
        navigate('/createProduit');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditingProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, ...editingProduct } : product
        ));
        setEditingProductId(null);
        setEditingProduct({
            name: '',
            capacity: '',
            unit: '',
            pallets: ''
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Produits</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={handleCreateProductClick}
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
                        <th className="py-2 px-4 border-b text-center">Nombre de palettes</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingProduct.name}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        onBlur={() => handleSave(product.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    product.unit
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="pallets"
                                        value={editingProduct.pallets}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(product.id)}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    product.pallets
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                                <div className="flex justify-end items-center space-x-2">
                                    <button
                                        className="text-white h-10 flex items-center justify-center"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
                                    </button>
                                    <button
                                        className="text-white h-10 flex items-center justify-center"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
                                    </button>
                                </div>
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
