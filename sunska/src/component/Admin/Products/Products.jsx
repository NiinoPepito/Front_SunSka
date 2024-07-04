import React, { useState } from 'react';
import CreateProducts from "./CreateProducts";
import DeleteProducts from "./DeleteProducts";
import UpdateProduct from "./UpdateProducts";

const Products = () => {
    const [action, setAction] = useState('');

    const handleCreate = () => setAction('create');
    const handleDelete = () => setAction('delete');
    const handleUpdate = () => setAction('update');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-top p-4">
            <div className="mb-4 flex flex-wrap justify-center space-x-2">
                <button
                    onClick={handleCreate}
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Créer un produit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Supprimer le produit
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Modifier un produit
                </button>
            </div>
            {action === 'create' && <CreateProducts />}
            {action === 'delete' && <DeleteProducts />}
            {action === 'update' && <UpdateProduct />}
        </div>
    );
};

export default Products;
