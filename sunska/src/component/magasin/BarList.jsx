// BarList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarList = () => {
    const bars = [
        { id: 1, name: 'Bar A', location: 'Location A', chef: 'Chef A' },
        { id: 2, name: 'Bar B', location: 'Location B', chef: 'Chef B' },
        { id: 3, name: 'Bar C', location: 'Location C', chef: 'Chef C' },
        { id: 4, name: 'Bar D', location: 'Location D', chef: 'Chef D' },
        // Ajoutez plus de bars ici
    ];

    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/bardetail/${id}`);
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
                            className={`cursor-pointer ${index % 2 === 0 ? "bg-tabvertbleu" : ""}`}
                            onClick={() => handleRowClick(bar.id)}
                        >
                            <td className="py-2 px-4 border-b">{bar.name}</td>
                            <td className="py-2 px-4 border-b">{bar.location}</td>
                            <td className="py-2 px-4 border-b">{bar.chef}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BarList;
