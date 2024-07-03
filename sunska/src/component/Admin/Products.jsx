import React, { useState } from 'react';
import CreateProducts from "./CreateProducts";

const Products = () => {
    const [action, setAction] = useState('');

    const handleCreate = () => setAction('create');
    const handleDelete = () => setAction('delete');
    const handleUpdate = () => setAction('update');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <div className="w-full flex justify-start p-4 bg-white shadow-md fixed top-0 left-0">
                <button
                    onClick={handleCreate}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
                >
                    Create Product
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                >
                    Delete Product
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2"
                >
                    Update Product
                </button>
            </div>
            <div className="pt-20 w-full flex justify-center">
                {action === 'create' && <CreateProducts />}
            </div>
        </div>
    );
};

export default Products;