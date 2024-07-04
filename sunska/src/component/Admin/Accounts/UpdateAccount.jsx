import React, { useState, useEffect } from 'react';

const UpdateAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        identifier: '',
        password: '',
        role: '', // Add role field
    });

    // Simulate fetching account list
    useEffect(() => {
        const fetchAccounts = () => {
            // Simulated account list
            const accountList = [
                { id: 1, username: 'user1', identifier: 'user1_id', password: 'password1', role: 'user' },
                { id: 2, username: 'user2', identifier: 'user2_id', password: 'password2', role: 'admin' },
                // Add more accounts as needed
            ];
            setAccounts(accountList);
        };
        fetchAccounts();
    }, []);

    const handleAccountChange = (e) => {
        const accountId = e.target.value;
        setSelectedAccount(accountId);
        const account = accounts.find((a) => a.id.toString() === accountId);
        if (account) {
            setFormData({
                username: account.username,
                identifier: account.identifier,
                password: account.password,
                role: account.role, // Set role
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Updated account details: ${JSON.stringify(formData)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountSelect">
                    Choisir un compte
                </label>
                <select
                    id="accountSelect"
                    name="accountSelect"
                    value={selectedAccount}
                    onChange={handleAccountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="" disabled>Choisir un compte</option>
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.username}
                        </option>
                    ))}
                </select>
            </div>
            {selectedAccount && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                            Identifiant
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Rôle
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </>
            )}
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-vertbleu hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Modifier
                </button>
            </div>
        </form>
    );
};

export default UpdateAccount;
