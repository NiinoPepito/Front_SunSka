import React, { useState } from 'react';
import UpdateAccount from "./UpdateAccount";
import DeleteAccount from "./DeleteAccount";
import CreateAccount from "./CreateAccount";

const Accounts = () => {
    const [action, setAction] = useState('');

    const handleCreate = () => setAction('create');
    const handleDelete = () => setAction('delete');
    const handleUpdate = () => setAction('update');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-top p-4">
            <div className="mb-4 flex flex-wrap justify-center space-x-2">
                <button
                    onClick={handleCreate}
                    className="bg-customGreen hover:bg-customHover text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Créer un compte
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-customGreen hover:bg-customHover text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Supprimer un compte
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-customGreen hover:bg-customHover text-white font-bold py-2 px-4 rounded mx-2 my-1"
                >
                    Modifier un compte
                </button>
            </div>
            <div className="pt-24 w-full flex justify-center">
                {action === 'create' && <CreateAccount />}
                {action === 'delete' && <DeleteAccount />}
                {action === 'update' && <UpdateAccount />}
            </div>
        </div>
    );
};

export default Accounts;
