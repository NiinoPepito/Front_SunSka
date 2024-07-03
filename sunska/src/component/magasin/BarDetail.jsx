// BarDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BarDetail = () => {
    const { id } = useParams();
    const initialProducts = [
        { id: 1, name: 'Produit A', stockBar: 10, stockMagasin: 20, reassort: 0 },
        { id: 2, name: 'Produit B', stockBar: 15, stockMagasin: 25, reassort: 0 },
        { id: 3, name: 'Produit C', stockBar: 20, stockMagasin: 30, reassort: 0 },
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
            product.id === id ? { ...product, stockBar: product.stockBar + product.reassort, reassort: 0 } : product
        ));
    };

    const handleGenerateOrder = () => {
        // Logique pour générer une commande
        alert('Commande générée');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Stock du Bar {id}</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded"
                    onClick={handleGenerateOrder}
                >
                    Générer une commande
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Produits</th>
                        <th className="py-2 px-4 border-b">Stock Bar</th>
                        <th className="py-2 px-4 border-b">Stock Magasin</th>
                        <th className="py-2 px-4 border-b">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.stockBar}</td>
                            <td className="py-2 px-4 border-b">{product.stockMagasin}</td>
                            <td className="py-2 px-4 border-b flex justify-center items-center">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 mr-2"
                                    value={product.reassort}
                                    onChange={(e) => handleReassortChange(product.id, parseInt(e.target.value) || 0)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded"
                    onClick={handleGenerateOrder}
                >
                    Générer une commande
                </button>
            </div>
        </div>
    );
};

export default BarDetail;