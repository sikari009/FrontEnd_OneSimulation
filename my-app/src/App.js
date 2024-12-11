import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = "https://your-app.onrender.com"; // Replace with your Render backend URL

const App = () => {
  const [arduinoData, setArduinoData] = useState({});

  useEffect(() => {
    const socket = io(SOCKET_URL);

    // Listen for updates from the backend
    socket.on("update", (data) => {
      console.log("Received Data:", data);
      setArduinoData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Arduino Data</h1>
      <pre style={{ fontSize: "1.5em" }}>
        {arduinoData.sensor ? JSON.stringify(arduinoData, null, 2) : "Waiting for data..."}
      </pre>
    </div>
  );
};

export default App;
