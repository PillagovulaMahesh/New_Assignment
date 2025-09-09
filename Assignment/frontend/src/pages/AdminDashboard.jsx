// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAllStudents, addStudent, updateStudent, deleteStudent } from "../api/api";
import StudentForm from "../components/StudentForm";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const { data } = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (formData) => {
    await addStudent(formData);
    fetchStudents();
  };

  const handleUpdate = async (formData) => {
    await updateStudent(editingStudent._id, formData);
    setEditingStudent(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {editingStudent ? (
        <StudentForm
          initialData={editingStudent}
          onSubmit={handleUpdate}
          buttonText="Update Student"
        />
      ) : (
        <StudentForm onSubmit={handleAdd} buttonText="Add Student" />
      )}

      <h2 className="text-xl mt-6 mb-2">All Students</h2>
      <table className="w-full border shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border">{s.course}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => setEditingStudent(s)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
