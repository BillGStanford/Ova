import React, { useState, useEffect } from "react";

function Settings() {
  const [username, setUsername] = useState("Loading...");
  const [error, setError] = useState(null);

  // Fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: token,  // Pass token to the server for authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Run only once when the component mounts

  return (
    <div>
      <h1>Account Settings</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Hello, {username}</p>
      )}
    </div>
  );
}

export default Settings;
