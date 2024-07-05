import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CommandeDetailsPast = () => {
    const { id } = useParams();

    // Exemple de données des produits pour une commande spécifique
    const [products] = useState([
        { id: 1, name: 'Produit A', quantity: 2 },
        { id: 2, name: 'Produit B', quantity: 1 },
        { id: 3, name: 'Produit C', quantity: 5 },
    ]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Détails de la commande N°{id}</h1>

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
                            <td className="py-2 px-4 border-b">{product.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommandeDetailsPast;
