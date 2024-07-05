import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StockBar = () => {
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
                quantity: 0,
                stockId: `${item.stockId}`,
                buildingId: `${buildingId}`
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de stock', error);
        }
    };

    const handleQuantityChange = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity: quantity } : product
        ));
    };

    const handleValidateSale = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSale = async () => {
        try {
            // Création du tableau stockQtts à partir de productsToSell
            const stockQtts = productsToSell.map(product => [parseInt(product.stockId), product.quantity]);

            const payload = {
                stockQtts: stockQtts,
                buildingId: parseInt(productsToSell[0].buildingId) // Supposons que buildingId est le même pour tous les produits vendus
            };

            const response = await fetch('http://localhost:8080/orders/SALE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Mise à jour du stock après la vente dans l'interface
                setProducts(products.map(product =>
                    product.quantity > 0
                        ? { ...product, stock: product.stock - product.quantity, quantity: 0 }
                        : product
                ));
                setShowConfirmation(false);
                // alert('Vente validée');
            } else {
                console.error('Erreur lors de la validation de la vente:', response.statusText);
                alert('Erreur lors de la validation de la vente');
            }
        } catch (error) {
            console.error('Erreur lors de la validation de la vente:', error);
            alert('Erreur lors de la validation de la vente');
        }
    };

    const handleCancelSale = () => {
        setShowConfirmation(false);
    };

    const productsToSell = products.filter(product => product.quantity > 0);

    const handleAddProduct = () => {
        navigate(`/addstockbuilding?buildingId=${buildingId}`);
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
                    onClick={handleValidateSale}
                >
                    Valider la vente
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Produits</th>
                        <th className="py-2 px-4 border-b text-center w-20">Stock</th>
                        <th className="py-2 px-4 border-b text-center w-20">Quantité</th>
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
                                    className="border p-1 w-16 text-center rounded border-bleugris"
                                    value={product.quantity}
                                    onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                                    onBlur={(e) => e.target.value === '' && (e.target.value = '0')}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
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
                    onClick={handleValidateSale}
                >
                    Valider la vente
                </button>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Valider la vente</h2>
                        {productsToSell.length > 0 ? (
                            <ul className="mb-6">
                                {productsToSell.map(product => (
                                    <li key={product.id} className="mb-2">{product.name} : {product.quantity}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-6">La vente est vide.</p>
                        )}
                        <div className="flex justify-between">
                            <button
                                className="bg-annuler font-bold text-white px-4 py-2 rounded"
                                onClick={handleCancelSale}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-orange font-bold text-white px-4 py-2 rounded"
                                onClick={handleConfirmSale}
                                disabled={productsToSell.length === 0}
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

export default StockBar;
