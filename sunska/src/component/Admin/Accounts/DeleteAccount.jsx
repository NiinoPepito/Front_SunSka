import React, { useState } from 'react';

const DeleteAccount = () => {
    const [accountId, setAccountId] = useState('');

    const handleChange = (e) => {
        setAccountId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Account to delete: ${accountId}`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountId">
                    Nom
                </label>
                <input
                    type="text"
                    id="accountId"
                    name="accountId"
                    value={accountId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Supprimer le compte
                </button>
            </div>
        </form>
    );
};

export default DeleteAccount;
