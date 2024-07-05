import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Buildings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({
        name: '',
        type: ''
    });

    useEffect(() => {
        fetch('http://localhost:8080/buildings')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditingUser({
            name: user.name,
            type: user.type
        });
    };

    const handleCreateUserClick = () => {
        navigate('/createBuilding');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditingUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/buildings/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    type: editingUser.type
                })
            });
            const data = await response.json();
            setUsers(users.map(user =>
                user.id === id ? { ...user, ...editingUser } : user
            ));
            setEditingUserId(null);
            setEditingUser({
                name: '',
                type: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleManageUsersClick = (buildingId) => {
        navigate(`/building/${buildingId}`);
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
                        <th className="py-2 px-4 border-b text-center">Action</th>
                        <th className="py-2 px-4 border-b text-center">Nom</th>
                        <th className="py-2 px-4 border-b text-center">Type</th>
                        <th className="py-2 px-4 border-b text-center">Modifier</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    className="bg-white text-black border border-black px-4 py-2 rounded"
                                    onClick={() => handleManageUsersClick(user.id)}
                                >
                                    Gérer les utilisateurs
                                </button>
                            </td>
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
                                    <Link to={`/building/${user.id}`}>
                                        {user.name}
                                    </Link>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editingUserId === user.id ? (
                                    <select
                                        name="type"
                                        value={editingUser.type}
                                        onChange={handleChange}
                                        className="border p-2 h-10 w-full"
                                    >
                                        <option value="SHOP">SHOP</option>
                                        <option value="BAR">BAR</option>
                                    </select>
                                ) : (
                                    user.type
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
