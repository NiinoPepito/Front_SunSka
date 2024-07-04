import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Buildings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const initialUsers = [
        { id: 1, name: 'Magasin A', theme: 'Magasin' },
        { id: 2, name: 'Bar B', theme: 'Bar' },
        { id: 3, name: 'Bar C', theme: 'Bar' },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({
        name: '',
        theme: ''
    });

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditingUser({
            name: user.name,
            theme: user.theme
        });
    };

    const handleCreateUserClick = () => {
        navigate('/createCompte');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditingUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, ...editingUser } : user
        ));
        setEditingUserId(null);
        setEditingUser({
            name: '',
            theme: ''
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Bâtiment</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={handleCreateUserClick}
                >
                    Créer un bâtiment
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Nom</th>
                        <th className="py-2 px-4 border-b text-center">Thème</th>
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
                                    <select
                                        name="theme"
                                        value={editingUser.theme}
                                        onChange={handleChange}
                                        className="border p-2 h-10 w-full"
                                    >
                                        <option value="Magasin">Magasin</option>
                                        <option value="Bar">Bar</option>
                                    </select>
                                ) : (
                                    user.theme
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                                <div className="flex justify-end items-center space-x-2">
                                    <button
                                        className="text-white h-10 flex items-center justify-center"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
                                    </button>
                                    <button
                                        className="text-white h-10 flex items-center justify-center"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
                                    </button>
                                    {editingUserId === user.id && (
                                        <button
                                            className="text-white h-10 flex items-center justify-center"
                                            onClick={() => handleSave(user.id)}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buildings;
