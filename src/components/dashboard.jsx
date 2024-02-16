import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
      // You can perform additional actions here if needed
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures that this effect runs only once

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome to the Dashboard!</h2>
          {/* Add the content of your dashboard here */}
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
