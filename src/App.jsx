import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      // Expand to full height
      tg.expand();
      
      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to Our Web App
        </h1>
        
        {user ? (
          <div className="text-center">
            <p className="text-xl mb-2">
              Hello, <span className="font-bold text-blue-600">
                {user.username ? `@${user.username}` : user.first_name}
              </span>! 👋
            </p>
            <p className="text-gray-600">
              We're glad to see you here!
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-2">
              Welcome, visitor! 👋
            </p>
            <p className="text-gray-600">
              Please open this page through Telegram.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;