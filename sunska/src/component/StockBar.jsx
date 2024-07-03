// StockBar.js
import React, { useState } from 'react';

const StockBar = () => {
    const initialProducts = [
        { id: 1, name: 'Produit A', stock: 10},
        { id: 2, name: 'Produit B', stock: 20},
        { id: 3, name: 'Produit C', stock: 20},
        { id: 4, name: 'Produit D', stock: 20},
        { id: 5, name: 'Produit E', stock: 20},
        { id: 6, name: 'Produit F', stock: 20},
        { id: 7, name: 'Produit G', stock: 20},
        // Ajoutez plus de produits ici
    ];

    const [products, setProducts] = useState(initialProducts);

    const incrementStock = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stock: product.stock + 1 } : product
        ));
    };

    const decrementStock = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stock: Math.max(product.stock - 1, 0) } : product
        ));
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Produits</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-4 px-4 border-b flex justify-center">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => incrementStock(product.id)}
                                >
                                    +
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3.5 py-1 rounded"
                                    onClick={() => decrementStock(product.id)}
                                >
                                    -
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

export default StockBar;
