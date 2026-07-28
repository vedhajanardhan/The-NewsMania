import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUserById();
      setUser(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load profile");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        👤 My Profile
      </h1>

      <div className="space-y-6">

        <div>
          <p className="text-gray-500">Full Name</p>
          <h2 className="text-2xl font-semibold">
            {user.fullName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h2 className="text-xl">
            {user.email}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default Profile;