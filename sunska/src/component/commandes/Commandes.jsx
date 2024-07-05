import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Commandes = () => {
    const [selectedTab, setSelectedTab] = useState('ongoing');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userBuildingString = localStorage.getItem('userBuilding');
        if (userBuildingString) {
            const userBuilding = JSON.parse(userBuildingString);
            const buildingId = userBuilding.id;
            fetchOrders(buildingId);
        }
    }, []);

    const fetchOrders = async (buildingId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/building/${buildingId}/details`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders:', response.statusText);
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    };

    const handleDetailsInProgressClick = (orderId) => {
        navigate(`/commandedetailsinprogress/${orderId}`);
    };

    const handleDetailspastClick = (orderId) => {
        navigate(`/commandedetailspast/${orderId}`);
    };

    // Filtrer les commandes en cours et passées
    const ongoingOrders = orders.filter(order => ['CREATED', 'PENDING'].includes(order.status));
    const pastOrders = orders.filter(order => ['DELIVERED', 'CANCELLED'].includes(order.status));

    const renderOngoingOrdersTable = (orders) => (
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b text-left">N°</th>
                <th className="py-2 px-4 border-b text-left">Date de création</th>
                <th className="py-2 px-4 border-b text-left">Date de dernière maj</th>
                <th className="py-2 px-4 border-b text-left">Statut</th>
                <th className="py-2 px-4 border-b text-left">Détails</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.createdAt}</td>
                    <td className="py-2 px-4 border-b">{order.updatedAt}</td>
                    <td className="py-2 px-4 border-b">{order.status}</td>
                    <td className="py-2 px-4 border-b">
                        <button className="bg-orange text-white px-2 py-1 rounded" onClick={() => handleDetailsInProgressClick(order.id)}>Détails</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const renderPastOrdersTable = (orders) => (
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b text-left">N°</th>
                <th className="py-2 px-4 border-b text-left">Date de création</th>
                <th className="py-2 px-4 border-b text-left">Date de fin</th>
                <th className="py-2 px-4 border-b text-left">Statut</th>
                <th className="py-2 px-4 border-b text-left">Détails</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.createdAt}</td>
                    <td className="py-2 px-4 border-b">{order.updatedAt}</td>
                    <td className="py-2 px-4 border-b">{order.status}</td>
                    <td className="py-2 px-4 border-b">
                        <button className="bg-orange text-white px-2 py-1 rounded" onClick={() => handleDetailspastClick(order.id)}>Détails</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Commandes</h1>
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded ${selectedTab === 'ongoing' ? 'bg-orange text-white' : 'bg-gray-300'}`}
                    onClick={() => setSelectedTab('ongoing')}
                >
                    Commandes en cours
                </button>
                <button
                    className={`px-4 py-2 rounded ${selectedTab === 'past' ? 'bg-orange text-white' : 'bg-gray-300'}`}
                    onClick={() => setSelectedTab('past')}
                >
                    Commandes passées
                </button>
            </div>
            <div>
                {selectedTab === 'ongoing' && renderOngoingOrdersTable(ongoingOrders)}
                {selectedTab === 'past' && renderPastOrdersTable(pastOrders)}
            </div>
        </div>
    );
};

export default Commandes;
