// BarDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BarDetail = () => {
    const { id } = useParams();
    const initialProducts = [
        { id: 1, name: 'Produit A', stockBar: 10, stockMagasin: 20, orderQuantity: 0 },
        { id: 2, name: 'Produit B', stockBar: 15, stockMagasin: 25, orderQuantity: 0 },
        { id: 3, name: 'Produit C', stockBar: 20, stockMagasin: 30, orderQuantity: 0 },
        // Ajoutez plus de produits ici
    ];

    const [products, setProducts] = useState(initialProducts);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

    const handleOrderQuantityChange = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, orderQuantity: quantity } : product
        ));
    };

    const handleGenerateOrder = () => {
        setShowOrderConfirmation(true);
    };

    const handleConfirmOrder = () => {
        // Logic for confirming the order
        setShowOrderConfirmation(false);
        setProducts(products.map(product => ({ ...product, orderQuantity: 0 })));
        alert('Commande générée');
    };

    const handleCancelOrder = () => {
        setShowOrderConfirmation(false);
    };

    const productsToOrder = products.filter(product => product.orderQuantity > 0);

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
                        <th className="py-2 px-4 border-b text-left">Produits</th>
                        <th className="py-2 px-4 border-b text-center w-20">Stock Bar</th>
                        <th className="py-2 px-4 border-b text-center w-20">Stock Magasin</th>
                        <th className="py-2 px-4 border-b text-center w-32">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-left">{product.name}</td>
                            <td className="py-2 px-4 border-b text-center">{product.stockBar}</td>
                            <td className="py-2 px-4 border-b text-center">{product.stockMagasin}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 text-center rounded border-bleugris"
                                    value={product.orderQuantity}
                                    onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                                    onBlur={(e) => e.target.value === '' && (e.target.value = '0')}
                                    onChange={(e) => handleOrderQuantityChange(product.id, parseInt(e.target.value) || 0)}
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

            {showOrderConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmer la commande</h2>
                        {productsToOrder.length > 0 ? (
                            <ul className="mb-4">
                                {productsToOrder.map(product => (
                                    <li key={product.id}>{product.name}: {product.orderQuantity}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-4">Aucun produit à commander.</p>
                        )}
                        <div className="flex justify-end">
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded mr-2"
                                onClick={handleConfirmOrder}
                                disabled={productsToOrder.length === 0}
                            >
                                Générer
                            </button>
                            <button
                                className="bg-annuler font-bold text-white px-4 py-2 rounded"
                                onClick={handleCancelOrder}
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

export default BarDetail;
