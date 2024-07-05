import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Commandes = () => {
    const [selectedTab, setSelectedTab] = useState('ongoing');
    const navigate = useNavigate();

    const orders = [
        { id: 1, createdAt: '2024-01-01', updatedAt: '2024-01-05', status: 'Livraison en cours' },
        { id: 2, createdAt: '2024-01-02', updatedAt: '2024-01-06', status: 'En préparation' },
        { id: 3, createdAt: '2024-01-03', updatedAt: '2024-01-07', status: 'Validé' },
        { id: 4, createdAt: '2024-01-04', updatedAt: '2024-01-08', status: 'Annulé' },
    ];

    const ongoingOrders = orders.filter(order => order.status === 'Livraison en cours' || order.status === 'En préparation');
    const pastOrders = orders.filter(order => order.status === 'Validé' || order.status === 'Annulé');

    const handleDetailsInProgressClick = (orderId) => {
        navigate(`/commandedetailsinprogress/${orderId}`);
    };
    const handleDetailspastClick = (orderId) => {
        navigate(`/commandedetailspast/${orderId}`);
    };

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
