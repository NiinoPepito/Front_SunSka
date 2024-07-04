import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Commandes = () => {
    const pendingOrder = true, 
    testOrder = false, 
    deliveredOrder = false;

    const [pending, setPending] = useState(pendingOrder);
    const [test, setTest] = useState(testOrder);
    const [delivered, setDelivered] = useState(deliveredOrder);

    const getChecked = () => {
        return document.querySelector(
            'input[name="commandes-type-radio"]:checked'
          )?.value ?? "pending"
    }

    const handleRadioChecked = () => {
        let selectedOption = getChecked();

        if (selectedOption === "pending") {
            setPending(true);
            setTest(false);
            setDelivered(false);
        } else if (selectedOption === "test") {
            setPending(false);
            setTest(true);
            setDelivered(false);
        } else if (selectedOption === "delivered") {
            setPending(false);
            setTest(false);
            setDelivered(true);
        }
      }

      const orderList = [
        {
            id: 0,
            status: 'pending',
            products : [
                { id: 1, name: 'Produit A', quantity: 10 },
                { id: 2, name: 'Produit B', quantity: 20 },
                { id: 3, name: 'Produit C', quantity: 20 },
            ]
        },
        {
            id: 1,
            status: 'pending',
            products : [
                { id: 4, name: 'Produit D', quantity: 10 },
                { id: 5, name: 'Produit E', quantity: 20 },
                { id: 6, name: 'Produit F', quantity: 20 },
            ]
        },
        {
            id: 2,
            status: 'test',
            products : [
                { id: 1, name: 'Produit A', quantity: 10 },
                { id: 4, name: 'Produit D', quantity: 20 },
                { id: 5, name: 'Produit E', quantity: 20 },
            ]
        }
      ];

      const [orders] = useState(orderList);


    return (
        <>
        <h1>Commandes</h1>
        <div className="flex flex-row w-fit ring-2 ring-bleugris rounded-3xl">
            <div className="flex items-center">
                <input id="commandes-en-cours" name="commandes-type-radio" type="radio" onChange={handleRadioChecked} checked={pending} value="pending" className="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label htmlFor="commandes-en-cours" className="p-2 text-sm font-medium rounded-l-3xl bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes en cours</label>
            </div>
            <div className="flex items-center">
                <input id="commandes-test" name="commandes-type-radio" type="radio" onChange={handleRadioChecked} checked={test} value="test" className="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label htmlFor="commandes-test" className="p-2 text-sm font-medium bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes test</label>
            </div>
            <div className="flex items-center ">
                <input id="commandes-en-passees" name="commandes-type-radio" type="radio" onChange={handleRadioChecked} checked={delivered} value="delivered" className="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label htmlFor="commandes-en-passees" className="p-2 text-sm font-medium rounded-r-3xl bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes passées</label>
            </div>
        </div>

        <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">n°</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (order.status === getChecked() &&
                        <tr  key={order.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="py-2 px-4 border-b">{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.status}</td>
                            <td className="py-4 px-4 border-b flex justify-center">
                                <NavLink to={`/commande/${order.id}`} className="bg-orange text-white px-3 py-1 rounded mr-2">
                                    Détails
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


        </>
    );
};

export default Commandes;