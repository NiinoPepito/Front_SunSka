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

      const [orderRequest] = useState(orderList[id]);

      const [order, setOrder] = useState(orderRequest);

      const handleQuantityChange = (id, quantity) => {
        setOrder(order.products.map(product =>
            product.id === id ? {...order, products: { ...product, quantity: quantity }} : order
        ));
        alert(`${order.products.find((product) => product.id == id).name}`)
    };

    return (
        <>
            <div className='flex flex-col items-center mb-10'>
                <h1 className='text-3xl mb-3'>Commande n°<span className='font-bold'>{ order.id }</span></h1>
                <h2 className='text-3xl mb-3'>Bar <NavLink to={`/stockbar/${order.bar.id}`} className='font-bold text-orange underline'>{ order.bar.name }</NavLink></h2>
                {order.status === "pending" && <button className="bg-orange text-white px-3 py-1 rounded">Valider la commande</button>}
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
        </>
    )
}

export default Commande;