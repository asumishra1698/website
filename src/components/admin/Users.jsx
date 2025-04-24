import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../reuseable/Sidebar";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [showAddUser, setShowAddUser] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add User
  const handleAddUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message.includes("already exists")) {
          toast.error("User already exists. Please use a different email.");
        } else {
          throw new Error(data.message || "Failed to add user.");
        }
        return;
      }

      toast.success("User added successfully!");
      setShowAddUser(false);
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Failed to add user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully!");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error(error.message || "Failed to delete user.");
    }
  };

  return (
    <div className="dashboard-container flex">
      <Sidebar />

      <div className="main-content flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Registered Users
          </h2>
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowAddUser(true)}
          >
            + Add User
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center py-4 px-2 hover:bg-gray-50"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New User
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleAddUser}
              >
                Add User
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
