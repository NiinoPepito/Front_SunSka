import React, { useState, useEffect } from 'react';

const UpdateAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Simulate fetching account list
    useEffect(() => {
        const fetchAccounts = () => {
            // Simulated account list
            const accountList = [
                { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
                { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
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
                email: account.email,
                password: account.password,
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
        // You can add further actions here (e.g., API call to update the account)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountSelect">
                    Select Account
                </label>
                <select
                    id="accountSelect"
                    name="accountSelect"
                    value={selectedAccount}
                    onChange={handleAccountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="" disabled>Select an account</option>
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
                            Username
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
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
                </>
            )}
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Account
                </button>
            </div>
        </form>
    );
};

export default UpdateAccount;
