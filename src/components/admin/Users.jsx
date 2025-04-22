import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
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
    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return; // User canceled action

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
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2>Registered Users</h2>
          {error && <p className="error">{error}</p>}

          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setShowAddUser(true)}>
            + Add User
          </button>
        </div>

        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-card">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
              <button
                 className="text-red-600 hover:text-red-900"
                onClick={() => handleDeleteUser(user._id)}
              >
                🗑 Delete
              </button>
            </li>
          ))}
        </ul>       
      </div>

      {showAddUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add New User</h3>

            <div className="modal-inputs">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </div>

            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={handleAddUser}>
                Add User
              </button>
              <button
                className="btn btn-secondary"
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
