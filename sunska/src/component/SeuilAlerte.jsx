import React, { useState, useEffect } from 'react';

const SeuilAlerte = () => {
    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buildingName, setBuildingName] = useState('');

    useEffect(() => {
        // Récupérer l'objet du bâtiment depuis localStorage
        const storedUser = localStorage.getItem('userBuilding');
        if (storedUser) {
            try {
                const userObject = JSON.parse(storedUser);
                if (userObject.name) {
                    setBuildingName(userObject.name);
                }
                if (userObject.id) {
                    fetchStockData(userObject.id);
                }
            } catch (error) {
                console.error('Erreur lors du parsing de l\'objet userBuilding', error);
            }
        }
    }, []);

    const fetchStockData = async (buildingId) => {
        try {
            const response = await fetch(`http://localhost:8080/stock/2024/${buildingId}`);
            const data = await response.json();
            const formattedProducts = data.map((item, index) => ({
                id: index + 1,
                name: `${item.name} - ${item.capacity} ${item.unit}`,
                stock: item.currentStock,
                alertThreshold: item.alert || 0,
                newAlertThreshold: item.alert || 0,
                stockId: `${item.stockId}`,
                buildingId: `${buildingId}`
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de stock', error);
        }
    };

    const handleAlertThresholdChange = (id, threshold) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, newAlertThreshold: threshold } : product
        ));
    };

    const handleValidateThreshold = () => {
        setShowConfirmation(true);
    };

    const handleConfirmThreshold = async () => {
        try {
            const updateRequests = productsToUpdate.map(product =>
                fetch(`http://localhost:8080/stock/${product.stockId}/alert`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ alert: product.newAlertThreshold })
                })
            );

            const responses = await Promise.all(updateRequests);

            const allSuccessful = responses.every(response => response.ok);

            if (allSuccessful) {
                setProducts(products.map(product =>
                    product.newAlertThreshold !== product.alertThreshold
                        ? { ...product, alertThreshold: product.newAlertThreshold }
                        : product
                ));
                setShowConfirmation(false);
                alert('Seuil d\'alerte mis à jour');
            } else {
                console.error('Erreur lors de la mise à jour du seuil d\'alerte');
                alert('Erreur lors de la mise à jour du seuil d\'alerte');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du seuil d\'alerte:', error);
            alert('Erreur lors de la mise à jour du seuil d\'alerte');
        }
    };

    const handleCancelThreshold = () => {
        setShowConfirmation(false);
    };

    const productsToUpdate = products.filter(product => product.newAlertThreshold !== product.alertThreshold);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">{`Seuil d'alerte du ${buildingName}`}</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange font-bold text-white px-4 py-2 rounded"
                    onClick={handleValidateThreshold}
                >
                    Valider les seuils
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Produits</th>
                        <th className="py-2 px-4 border-b text-center w-20">Stock</th>
                        <th className="py-2 px-4 border-b text-center w-20">Seuil actuel</th>
                        <th className="py-2 px-4 border-b text-center w-32">Nouveau seuil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b text-center">{product.stock}</td>
                            <td className="py-2 px-4 border-b text-center">{product.alertThreshold}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16 text-center rounded border-bleugris"
                                    value={product.newAlertThreshold}
                                    onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                                    onBlur={(e) => e.target.value === '' && (e.target.value = '0')}
                                    onChange={(e) => handleAlertThresholdChange(product.id, parseInt(e.target.value) || 0)}
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
                    onClick={handleValidateThreshold}
                >
                    Valider les seuils
                </button>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmer les seuils</h2>
                        {productsToUpdate.length > 0 ? (
                            <ul className="mb-4">
                                {productsToUpdate.map(product => (
                                    <li key={product.id}>{product.name}: {product.newAlertThreshold}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-4">Aucun seuil n'a été modifié.</p>
                        )}
                        <div className="flex justify-end">
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded mr-2"
                                onClick={handleConfirmThreshold}
                                disabled={productsToUpdate.length === 0}
                            >
                                Valider
                            </button>
                            <button
                                className="bg-annuler font-bold text-white px-4 py-2 rounded"
                                onClick={handleCancelThreshold}
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

export default SeuilAlerte;
