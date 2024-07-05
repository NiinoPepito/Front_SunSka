import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommandeDetailsInProgress = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        fetchOrderProducts(id);
    }, [id]);

    const fetchOrderProducts = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}/products`);
            if (response.ok) {
                const data = await response.json();
                const productsWithQuantity = data.products.map(product => ({
                    ...product,
                    valeurActuelle: product.stock,  // Initialiser à 1 ou à la quantité par défaut souhaitée
                    nouvelleValeur: product.stock  // Ajouter la quantité de la commande
                }));
                setProducts(productsWithQuantity);
            } else {
                console.error('Failed to fetch order products:', response.statusText);
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, nouvelleValeur: newQuantity } : product
        );
        setProducts(updatedProducts);
    };

    const handleValidateOrder = () => {
        setShowConfirmation(true);
    };

    const handleConfirmOrder = () => {
        const productsToValidate = products.map(product => ({
            id: product.id,
            name: `${product.name} - ${product.capacity}${product.unit}`,
            nouvelleValeur: product.nouvelleValeur
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
                        <th className="py-2 px-4 border-b text-left">Valeur actuelle</th>
                        <th className="py-2 px-4 border-b text-left">Nouvelle valeur</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b">{`${product.name} - ${product.capacity}${product.unit}`}</td>
                            <td className="py-2 px-4 border-b">{product.valeurActuelle}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 text-center rounded border-gray-300"
                                    value={product.nouvelleValeur}
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
                            <p key={product.id}>{`${product.name} - ${product.capacity}${product.unit}: ${product.nouvelleValeur}`}</p>
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
