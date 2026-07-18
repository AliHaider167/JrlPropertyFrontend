import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/users");
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id) => {
    try {
      await api.put(`/users/${id}/block`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Could not update this account.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this account? This cannot be undone.")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete this account.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-2xl text-navy-900">Users</h1>
        <p className="text-sm text-navy-700/60">
          {loading ? "Loading..." : `${users.length} account${users.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/60">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-navy-700/60">No accounts yet.</p>
      ) : (
        <div className="bg-white border border-navy-900/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-900/5 text-left text-xs uppercase tracking-wide text-navy-700/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u._id === currentUser?._id;
                return (
                  <tr key={u._id} className="border-t border-navy-900/10">
                    <td className="px-4 py-3 font-medium text-navy-900">
                      {u.name} {isSelf && <span className="text-xs text-navy-700/40">(you)</span>}
                    </td>
                    <td className="px-4 py-3 text-navy-700/70">{u.email}</td>
                    <td className="px-4 py-3 text-navy-700/70">{u.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-sm uppercase tracking-wide ${
                          u.role === "admin" ? "bg-navy-900 text-ivory" : "bg-navy-900/10 text-navy-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-sm ${
                          u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-700/70">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                      {!isSelf && (
                        <>
                          <button onClick={() => toggleBlock(u._id)} className="text-brass-600 hover:underline">
                            {u.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:underline">
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
