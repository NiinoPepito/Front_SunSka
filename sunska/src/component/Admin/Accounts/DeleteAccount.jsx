import React, { useState } from 'react';

const DeleteAccount = () => {
    const [accountId, setAccountId] = useState('');

    const handleChange = (e) => {
        setAccountId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Account to delete: ${accountId}`);
        // You can add further actions here (e.g., API call to delete the account)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountId">
                    Account ID or Username
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
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete Account
                </button>
            </div>
        </form>
    );
};

export default DeleteAccount;
