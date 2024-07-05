import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AssignedUserToBar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        role: ''
    });

    useEffect(() => {
        // Simuler la récupération des utilisateurs assignés au bâtiment depuis une API
        const fetchUsers = async () => {
            // Remplacer par une requête réelle à une API dans un cas réel
            const assignedUsers = [
                { id: 1, name: 'User 1', role: 'Role 1', assigned: true },
                { id: 2, name: 'User 2', role: 'Role 2', assigned: true }
            ];
            setUsers(assignedUsers);
        };

        fetchUsers();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1, assigned: true }]);
        setNewUser({ name: '', role: '' });
    };

    const toggleUserAssignment = (userId) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, assigned: !user.assigned } : user
        ));
    };

    const handleBackClick = () => {
        navigate('/building');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestion des utilisateurs dans le {id}</h1>
            <div className="mb-4">
                <button
                    className="bg-orange text-white px-4 py-2 rounded h-10"
                    onClick={handleBackClick}
                >
                    Retour
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom de l'utilisateur"
                    value={newUser.name}
                    onChange={handleChange}
                    className="border p-2 h-10 w-full mb-2"
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Rôle de l'utilisateur"
                    value={newUser.role}
                    onChange={handleChange}
                    className="border p-2 h-10 w-full"
                />
                <button
                    className="bg-vertbleu text-white px-4 py-2 rounded h-10 mt-2"
                    onClick={handleAddUser}
                >
                    Ajouter un compte
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Nom</th>
                        <th className="py-2 px-4 border-b text-center">Rôle</th>
                        <th className="py-2 px-4 border-b text-center">Assigner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-tabvertbleu" : ""}>
                            <td className="py-2 px-4 border-b text-center">{user.name}</td>
                            <td className="py-2 px-4 border-b text-center">{user.role}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <label className="flex items-center justify-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={user.assigned}
                                            onChange={() => toggleUserAssignment(user.id)}
                                        />
                                        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transition-transform ${user.assigned ? 'translate-x-full bg-green-500' : ''}`}></div>
                                    </div>
                                </label>
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
