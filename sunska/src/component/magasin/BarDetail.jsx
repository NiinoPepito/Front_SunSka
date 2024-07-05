import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BarDetail = () => {
    const { id } = useParams();
    const [barName, setBarName] = useState('');
    const [products, setProducts] = useState([]);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

    useEffect(() => {
        fetchBarName();
        fetchStockProducts();
    }, []);

    const fetchBarName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buildings/${id}/name`);
            if (response.ok) {
                const data = await response.text(); // Directly retrieve the name as text
                setBarName(data); // Set the barName state with the fetched name
            } else {
                console.error('Error fetching bar name:', response.statusText);
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    };

    const fetchStockProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/stock/2024/${id}/alert`);
            if (response.ok) {
                const data = await response.json();
                // Initialize orderQuantity for each product to 0 and associate with stockId
                const productsWithQuantity = data.map(product => ({
                    ...product,
                    orderQuantity: 0,
                    stockId: id
                }));
                setProducts(productsWithQuantity);
            } else {
                console.error('Error fetching stock products:', response.statusText);
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    };

    const handleOrderQuantityChange = (productId, stockId, quantity) => {
        setProducts(products.map(product =>
            product.id === productId && product.stockId === stockId
                ? { ...product, orderQuantity: quantity }
                : product
        ));
    };

    const handleGenerateOrder = () => {
        setShowOrderConfirmation(true);
    };

    const handleConfirmOrder = async () => {
        try {
            // Prepare the data structure for sending to the server
            const stockQtts = productsToOrder.map(product => [product.id, product.orderQuantity]);
            const data = {
                buildingId: id,
                stockQtts: stockQtts
            };

            // Send the order data to the server
            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setShowOrderConfirmation(false);
                setProducts(products.map(product => ({ ...product, orderQuantity: 0 })));
                alert('Commande générée');
            } else {
                console.error('Failed to generate order:', response.statusText);
                alert('Failed to generate order. Please try again.');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Error confirming order. Please try again.');
        }
    };


    const handleCancelOrder = () => {
        setShowOrderConfirmation(false);
    };

    const productsToOrder = products.filter(product => product.orderQuantity > 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">{`Stock du Bar ${barName}`}</h1>
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
                            <td className={`py-2 px-4 border-b text-left ${product.isAlert ? 'text-red-500' : ''}`}>
                                {`${product.productName} - ${product.productCapacity} ${product.productUnit}`}
                            </td>
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
                                    onChange={(e) =>
                                        handleOrderQuantityChange(product.id, product.stockId, parseInt(e.target.value) || 0)
                                    }
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
                                    <li key={product.id}>{product.productName}: {product.orderQuantity}</li>
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
