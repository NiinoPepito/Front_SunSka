import React, { useState } from 'react';

const DeleteProducts = () => {
    const [productId, setProductId] = useState('');

    const handleChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Product to delete: ${productId}`);
        // You can add further actions here (e.g., API call to delete the product)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
                    Nom du produit
                </label>
                <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={productId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Supprimer le produit
                </button>
            </div>
        </form>
    );
};

export default DeleteProducts;
