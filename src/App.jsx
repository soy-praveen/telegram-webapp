import React, { useEffect, useState } from 'react';
import './intro.css';  // Assuming you have the CSS file imported here

function App() {
  const [user, setUser] = useState(null);
  const [accountAge, setAccountAge] = useState(null);
  const [vicAmount, setVicAmount] = useState(0);

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

      // Simulate account age (you can replace this with real logic or API calls)
      const accountCreationDate = tg.initDataUnsafe?.user?.auth_date; // Placeholder, replace if available
      if (accountCreationDate) {
        const currentDate = new Date();
        const accountAgeInDays = Math.floor((currentDate - new Date(accountCreationDate * 1000)) / (1000 * 60 * 60 * 24));  // Convert seconds to days
        setAccountAge(accountAgeInDays);
        setVicAmount(accountAgeInDays); // Allocate VICs based on account age (1 VIC per day)
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to Our Web App
        </h1>

        {/* Loading steps */}
        <div className="container">
          <div className="step" id="step1">
            <p className="step-text" id="text1">Checking account age...</p>
            <div className="loading-bar-background">
              <div className="loading-bar" style={{ animationDelay: '0s' }}></div>
            </div>
            <p className="message">{accountAge !== null ? `Account age: ${accountAge} days` : 'Loading account age...'}</p>
          </div>

          <div className="step" id="step2">
            <p className="step-text" id="text2">Verifying Telegram activity...</p>
            <div className="loading-bar-background">
              <div className="loading-bar" style={{ animationDelay: '4s' }}></div>
            </div>
            <p className="message">Telegram activity verified</p>
          </div>

          <div className="step" id="step3">
            <p className="step-text" id="text3">Allocating VIC's...</p>
            <div className="loading-bar-background">
              <div className="loading-bar" style={{ animationDelay: '8s' }}></div>
            </div>
            <p className="message">{vicAmount !== null ? `Allocated VIC's: ${vicAmount}` : 'Loading VIC allocation...'}</p>
          </div>

          <button className="cssbuttons-io next-button" id="nextButton">
            <span>Next!</span>
          </button>
        </div>

        {user ? (
          <div className="text-center mt-6">
            <p className="text-xl mb-2">
              Hello, <span className="font-bold text-blue-600">
                {user.username ? `@${user.username}` : user.first_name}
              </span>! 👋
            </p>
            <p className="text-gray-600">
              Account age: {accountAge} days. We've allocated {vicAmount} VIC's based on that.
            </p>
          </div>
        ) : (
          <div className="text-center mt-6">
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
