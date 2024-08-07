import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Magasin = () => {
    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buildingId, setBuildingId] = useState(null);
    const [buildingName, setBuildingName] = useState('');
    const navigate = useNavigate();

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
                    setBuildingId(userObject.id);
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
                reassort: 0,
                stockId: `${item.stockId}`,
                buildingId: `${buildingId}`
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de stock', error);
        }
    };

    const handleReassortChange = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, reassort: quantity } : product
        ));
    };

    const handleValidateReassort = () => {
        setShowConfirmation(true);
    };

    const handleConfirmReassort = async () => {
        try {
            // Création du tableau stockQtts à partir de productsToReassort
            const stockQtts = productsToReassort.map(product => [parseInt(product.stockId), product.reassort]);

            const payload = {
                stockQtts: stockQtts,
                buildingId: parseInt(productsToReassort[0].buildingId) // Supposons que buildingId est le même pour tous les produits réassortis
            };

            const response = await fetch('http://localhost:8080/orders/RESTOCK', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Mise à jour du stock après le réassort dans l'interface
                setProducts(products.map(product =>
                    product.reassort > 0
                        ? { ...product, stock: product.stock + product.reassort, reassort: 0 }
                        : product
                ));
                setShowConfirmation(false);
                // alert('Réassort validé');
            } else {
                console.error('Erreur lors de la validation du réassort:', response.statusText);
                alert('Erreur lors de la validation du réassort');
            }
        } catch (error) {
            console.error('Erreur lors de la validation du réassort:', error);
            alert('Erreur lors de la validation du réassort');
        }
    };

    const handleCancelReassort = () => {
        setShowConfirmation(false);
    };

    const productsToReassort = products.filter(product => product.reassort > 0);

    const handleAddProduct = () => {
        if (buildingId) {
            navigate(`/addstockbuilding?buildingId=${buildingId}`);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">{`Stock du ${buildingName}`}</h1>
            <div className="flex justify-between mb-4">
                <button
                    className="bg-vertbleu font-bold text-white px-4 py-2 rounded"
                    onClick={handleAddProduct}
                >
                    Ajouter un produit
                </button>
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
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Confirmer le réassort</h2>
                        {productsToReassort.length > 0 ? (
                            <ul className="mb-6">
                                {productsToReassort.map(product => (
                                    <li key={product.id} className="mb-2">{product.name}: {product.reassort}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-6">Le réassort est vide.</p>
                        )}
                        <div className="flex justify-between">
                            <button
                                className="bg-annuler font-bold text-white px-4 py-2 rounded"
                                onClick={handleCancelReassort}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded"
                                onClick={handleConfirmReassort}
                                disabled={productsToReassort.length === 0}
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Magasin;
