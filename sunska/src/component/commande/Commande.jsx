import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Commande = ({id}) => {

    const orderList = [
        {
            id: 0,
            status: 'pending',
            bar: {
                id: '0',
                name: 'VIP Bar',
            },
            products : [
                { id: 1, name: 'Produit A', quantity: 10 },
                { id: 2, name: 'Produit B', quantity: 20 },
                { id: 3, name: 'Produit C', quantity: 20 },
            ]
        },
        {
            id: 1,
            status: 'pending',
            bar: {
                id: '0',
                name: 'VIP Bar',
            },
            products : [
                { id: 4, name: 'Produit D', quantity: 10 },
                { id: 5, name: 'Produit E', quantity: 20 },
                { id: 6, name: 'Produit F', quantity: 20 },
            ]
        },
        {
            id: 2,
            status: 'test',
            bar: {
                id: '0',
                name: 'VIP Bar',
            },
            products : [
                { id: 1, name: 'Produit A', quantity: 10 },
                { id: 4, name: 'Produit D', quantity: 20 },
                { id: 5, name: 'Produit E', quantity: 20 },
            ]
        }
      ];

      const [order] = useState(orderList[id]);

    return (
        <>
            <div className='flex flex-col items-center'>
                <h1>Commande n°<span className='font-bold'>{ order.id }</span></h1>
                <h2>Bar <NavLink to={`/stockbar/${order.bar.id}`} className='font-bold text-orange'>{ order.bar.name }</NavLink></h2>
                {order.status === "pending" && <button className="bg-orange text-white px-3 py-1 rounded mr-2">Valider la commande</button>}
            </div>
            <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Produits</th>
                        <th className="py-2 px-4 border-b">Quantité</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.quantity}</td>
                            <td className="py-4 px-4 border-b flex justify-center">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => console.log("+")}
                                >
                                    +
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3.5 py-1 rounded"
                                    onClick={() => console.log("-")}
                                >
                                    -
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>
    )
}

export default Commande;