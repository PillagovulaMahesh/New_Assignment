// frontend/src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/api";
import StudentForm from "../components/StudentForm";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await getMyProfile();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleUpdate = async (formData) => {
    await updateMyProfile(formData);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <StudentForm initialData={profile} onSubmit={handleUpdate} buttonText="Update Profile" />
    </div>
  );
};

export default StudentDashboard;
