// Magasin.js
import React, { useState } from 'react';

const Magasin = () => {
    const initialProducts = [
        { id: 1, name: 'Produit A', stock: 10, reassort: 0 },
        { id: 2, name: 'Produit B', stock: 20, reassort: 0 },
        { id: 3, name: 'Produit C', stock: 20, reassort: 0 },
        { id: 4, name: 'Produit D', stock: 20, reassort: 0 },
        { id: 5, name: 'Produit E', stock: 20, reassort: 0 },
        { id: 6, name: 'Produit F', stock: 20, reassort: 0 },
        { id: 7, name: 'Produit G', stock: 20, reassort: 0 },
        // Ajoutez plus de produits ici
    ];

    const [products, setProducts] = useState(initialProducts);

    const handleReassortChange = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, reassort: quantity } : product
        ));
    };

    const handleReassort = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stock: product.stock + product.reassort, reassort: 0 } : product
        ));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Stock du Magasin</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Produit</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Réassort</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b flex justify-center items-center">
                                <input
                                    type="number"
                                    className="border p-1 w-16 mr-2"
                                    value={product.reassort}
                                    onChange={(e) => handleReassortChange(product.id, parseInt(e.target.value) || 0)}
                                />
                                <button
                                    className="bg-orange text-white px-3 py-1 rounded"
                                    onClick={() => handleReassort(product.id)}
                                >
                                    Réassort
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Magasin;
