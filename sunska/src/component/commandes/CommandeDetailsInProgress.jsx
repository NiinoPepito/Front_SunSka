import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CommandeDetailsInProgress = () => {
    const { id } = useParams();

    // Exemple de données des produits pour une commande spécifique
    const [products, setProducts] = useState([
        { id: 1, name: 'Produit A', quantity: 2 },
        { id: 2, name: 'Produit B', quantity: 1 },
        { id: 3, name: 'Produit C', quantity: 5 },
    ]);

    const [showConfirmation, setShowConfirmation] = useState(false);

    // Gérer le changement de quantité d'un produit
    const handleQuantityChange = (productId, newQuantity) => {
        setProducts(products.map(product =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        ));
    };

    const handleValidateOrder = () => {
        setShowConfirmation(true);
    };

    const handleConfirmOrder = () => {
        // Récupérer les quantités des produits pour validation
        const productsToValidate = products.map(product => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity
        }));
        console.log('Validation de la commande avec les produits suivants :', productsToValidate);
        setShowConfirmation(false);
        alert('Commande validée avec succès');
    };

    const handleCancelOrder = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Détails de la commande N°{id}</h1>

            {/* Bouton en haut */}
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange font-bold text-white px-4 py-2 rounded"
                    onClick={handleValidateOrder}
                >
                    Valider
                </button>
            </div>

            {/* Tableau des produits */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Produits</th>
                        <th className="py-2 px-4 border-b text-left">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 text-center rounded border-gray-300"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Bouton en bas */}
            <div className="flex justify-end mt-4">
                <button
                    className="bg-orange font-bold text-white px-4 py-2 rounded"
                    onClick={handleValidateOrder}
                >
                    Valider
                </button>
            </div>

            {/* Popup de confirmation */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmer la commande</h2>
                        {products.map(product => (
                            <p key={product.id}>{product.name}: {product.quantity}</p>
                        ))}
                        <div className="flex justify-end">
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded mr-2"
                                onClick={handleConfirmOrder}
                            >
                                Valider
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

export default CommandeDetailsInProgress;
