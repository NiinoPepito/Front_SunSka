import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddStockBuilding = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [stock, setStock] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const buildingId = queryParams.get('buildingId');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Erreur lors de la récupération des produits:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des produits', error);
            }
        };

        if (buildingId) {
            fetchProducts();
        }
    }, [buildingId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                productId: selectedProduct,
                stock,
                buildingId: parseInt(buildingId)
            };

            const response = await fetch('http://localhost:8080/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Produit ajouté avec succès');
                // Rediriger vers la page de stock après l'ajout
                navigate(-1);
            } else {
                console.error('Erreur lors de l\'ajout du produit:', response.statusText);
                alert('Erreur lors de l\'ajout du produit');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            alert('Erreur lors de l\'ajout du produit');
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Formulaire d'ajout de stock</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700">Produit:</label>
                    <select
                        id="product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionnez un produit</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantité:</label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className=" bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        Retour
                    </button>
                    <button
                        type="submit"
                        className=" bg-vertbleu hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStockBuilding;
