import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const BarList = () => {
    const [bars, setBars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBars();
    }, []);

    const fetchBars = async () => {
        try {
            const response = await fetch('http://localhost:8080/buildings/2024/alerts');
            if (response.ok) {
                const data = await response.json();
                setBars(data);
            } else {
                console.error('Erreur lors de la récupération des bars.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion au serveur :', error);
        }
    };

    const handleRowClick = (barId) => {
        navigate(`/bardetail/${barId}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Liste des Bars</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <tbody>
                    {bars.map((bar, index) => (
                        <tr
                            key={bar.id}
                            className={`cursor-pointer ${bar.alert ? "bg-red-600 text-white" : ""} ${index % 2 === 0 ? "bg-tabvertbleu" : ""}`}
                            onClick={() => handleRowClick(bar.id)}
                        >
                            <td className="py-2 px-4 border-b text-center">{bar.barName}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    className="bg-vertbleu text-white px-4 py-2 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRowClick(bar.id);
                                    }}
                                >
                                    Accéder au stock
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BarList;
