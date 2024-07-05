import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey, faTimes, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const Accounts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({
        name: '',
        identifier: '',
        role: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users.');
                }
                const data = await response.json();
                const fetchedUsers = data.map(user => ({
                    id: user.id,
                    name: user.name,
                    identifier: user.login,
                    role: user.isAdmin ? 'Admin' : 'User',
                    isActive: !user.isArchived
                }));
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleActive = async (id) => {
        try {
            const user = users.find(user => user.id === id);
            const response = await fetch(`http://localhost:8080/users/${id}/archive`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isArchived: !user.isActive })
            });

            if (response.ok) {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, isActive: !user.isActive } : user
                ));
            } else {
                console.error("Failed to toggle user status.");
            }
        } catch (error) {
            console.error("There was an error toggling the user status!", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditingUser({
            name: user.name,
            identifier: user.identifier,
            role: user.role
        });
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    login: editingUser.identifier,
                    admin: editingUser.role === 'Admin'
                })
            });

            if (response.ok) {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, name: editingUser.name, identifier: editingUser.identifier, role: editingUser.role } : user
                ));
                setEditingUserId(null);
                setEditingUser({
                    name: '',
                    identifier: '',
                    role: ''
                });
            } else {
                console.error("Failed to save user.");
            }
        } catch (error) {
            console.error("There was an error saving the user!", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditingUser({
            name: '',
            identifier: '',
            role: ''
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditingUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleChangePassword = (userId) => {
        navigate(`/${userId}/password`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Comptes</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={() => navigate('/createCompte')}
                >
                    Créer un compte
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Nom</th>
                        <th className="py-2 px-4 border-b text-center">Identifiant</th>
                        <th className="py-2 px-4 border-b text-center">Role</th>
                        <th className="py-2 px-4 border-b text-center">Actif</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingUser.name}
                                        onChange={handleChange}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="identifier"
                                        value={editingUser.identifier}
                                        onChange={handleChange}
                                        className="border p-2 h-10 w-full"
                                    />
                                ) : (
                                    user.identifier
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <select
                                        name="role"
                                        value={editingUser.role}
                                        onChange={handleChange}
                                        className="border p-2 h-10 w-full"
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <div style={{width: '80px', margin: 'auto'}}>
                                        {user.isActive ? 'Actif' : 'Désactivé'}
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <button
                                            className={`h-10 flex items-center ${
                                                user.isActive ? 'text-green-600' : 'text-red-600'
                                            }`}
                                            onClick={() => handleToggleActive(user.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={user.isActive ? faToggleOn : faToggleOff}
                                                className={user.isActive ? 'text-green-600' : 'text-red-600'}
                                            />
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <div className="flex justify-end items-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleSave(user.id)}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleCancelEdit()}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end items-center space-x-2">
                                        <button
                                            className="text-blue-600 h-10 flex items-center justify-center"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-600"/>
                                        </button>
                                        <button
                                            className="text-green-600 h-10 flex items-center justify-center"
                                            onClick={() => handleChangePassword(user.id)}
                                        >
                                            <FontAwesomeIcon icon={faKey} className="text-green-600"/>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Accounts;
