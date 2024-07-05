import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AssignedUserToBar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [building, setBuilding] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        isAdmin: false
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/buildings/${id}/users`);
                const data = await response.json();
                setUsers(data);

                const allUsersResponse = await fetch('http://localhost:8080/users');
                const allUsersData = await allUsersResponse.json();
                setAllUsers(allUsersData);

                const buildingResponse = await fetch(`http://localhost:8080/buildings/${id}`);
                const buildingData = await buildingResponse.json();
                setBuilding(buildingData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (name === 'name') {
            const selectedUser = allUsers.find(user => user.id === parseInt(value));
            setNewUser(prevState => ({ ...prevState, [name]: selectedUser.name, userId: selectedUser.id }));
        } else if (type === 'checkbox') {
            setNewUser(prevState => ({ ...prevState, [name]: checked }));
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buildings/${id}/users/${newUser.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAdmin: newUser.isAdmin })
            });
            const data = await response.json();
            const newUserData = {
                userId: newUser.userId,
                userName: newUser.name,
                buildingId: id,
                isAdmin: newUser.isAdmin
            };
            setUsers([...users, newUserData]);
            setNewUser({ name: '', isAdmin: false, userId: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleUserAssignment = async (userId) => {
        try {
            await fetch(`http://localhost:8080/buildings/${id}/users/${userId}`, {
                method: 'DELETE'
            });
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/building');
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={handleBackClick}
                >
                    Retour
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-center">Gestion des utilisateurs dans le {building ? building.name : id}</h1>
            <div className="mb-4 flex justify-center">
                <div className="w-full max-w-md">
                    <select
                        name="name"
                        value={newUser.userId}
                        onChange={handleChange}
                        className="border p-2 h-10 w-full mb-2"
                    >
                        <option value="">Sélectionnez un utilisateur</option>
                        {allUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button
                        className="bg-vertbleu text-white px-3 py-1 rounded mt-2 w-full"
                        onClick={handleAddUser}
                    >
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Nom</th>
                        <th className="py-2 px-4 border-b text-center">Rôle</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.userId} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">{user.userName}</td>
                            <td className="py-2 px-4 border-b text-center">{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    className="text-red-500"
                                    onClick={() => toggleUserAssignment(user.userId)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedUserToBar;