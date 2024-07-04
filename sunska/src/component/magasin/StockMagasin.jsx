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
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleReassortChange = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, reassort: quantity } : product
        ));
    };

    const handleReassort = () => {
        setProducts(products.map(product =>
            product.reassort > 0
                ? { ...product, stock: product.stock + product.reassort, reassort: 0 }
                : product
        ));
        setShowConfirmation(false);
    };

    const handleValidateReassort = () => {
        setShowConfirmation(true);
    };

    const handleCancelReassort = () => {
        setShowConfirmation(false);
    };

    const productsToReassort = products.filter(product => product.reassort > 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Stock du Magasin</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange font-bold text-white px-4 py-2 rounded"
                    onClick={handleValidateReassort}
                >
                    Valider le réassort
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Produit</th>
                        <th className="py-2 px-4 border-b text-center w-20">Stock</th>
                        <th className="py-2 px-4 border-b text-center w-32">Réassort</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b text-center">{product.stock}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 text-center border-bleugris rounded"
                                    value={product.reassort}
                                    onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                                    onBlur={(e) => e.target.value === '' && (e.target.value = '0')}
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
                    className="bg-orange font-bold text-white px-4 py-2 rounded"
                    onClick={handleValidateReassort}
                >
                    Valider le réassort
                </button>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmer le réassort</h2>
                        {productsToReassort.length > 0 ? (
                            <ul className="mb-4">
                                {productsToReassort.map(product => (
                                    <li key={product.id}>{product.name}: {product.reassort}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-4">Le réassort est vide.</p>
                        )}
                        <div className="flex justify-end">
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded mr-2"
                                onClick={handleReassort}
                                disabled={productsToReassort.length === 0}
                            >
                                Valider
                            </button>
                            <button
                                className="bg-annuler font-bold text-white px-4 py-2 rounded"
                                onClick={handleCancelReassort}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Magasin;
