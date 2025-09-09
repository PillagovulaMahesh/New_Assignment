// frontend/src/components/StudentForm.js
import React, { useState, useEffect } from "react";

const StudentForm = ({ initialData = {}, onSubmit, buttonText = "Save" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        course: initialData.course || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Course</label>
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default StudentForm;
