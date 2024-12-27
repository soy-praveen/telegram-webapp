import React, { useEffect, useState } from 'react';

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121212',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      fontFamily: "'Poppins', sans-serif",
      color: 'white',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          Welcome to Our Web App
        </h1>

        {/* Loading steps */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            opacity: 0,
            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
            transform: 'translateY(20px)',
          }} className="step visible">
            <p style={{
              margin: 0,
              fontSize: '1.2rem',
              animation: 'glow 2s infinite alternate, pulse 3s infinite',
            }}>
              Checking account age...
            </p>
            <div style={{
              margin: '3px 0',
              display: 'flex',
              alignItems: 'center',
              width: '200px',
              height: '30px',
              backgroundColor: '#212121',
              boxShadow: 'inset -2px 2px 4px #0c0c0c',
              borderRadius: '15px',
              position: 'relative',
            }}>
              <div style={{
                height: '20px',
                width: '0%',
                background: 'linear-gradient(0deg, rgba(222, 74, 15, 1) 0%, rgba(249, 199, 79, 1) 100%)',
                borderRadius: '10px',
                animation: 'loading 3s ease-out forwards',
              }}></div>
            </div>
            <p style={{
              display: accountAge !== null ? 'block' : 'none',
              fontSize: '1.1rem',
              marginTop: '2px',
            }}>
              {accountAge !== null ? `Account age: ${accountAge} days` : 'Loading account age...'}
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            opacity: 0,
            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
            transform: 'translateY(20px)',
          }} className="step visible">
            <p style={{
              margin: 0,
              fontSize: '1.2rem',
              animation: 'glow 2s infinite alternate, pulse 3s infinite',
            }}>
              Verifying Telegram activity...
            </p>
            <div style={{
              margin: '3px 0',
              display: 'flex',
              alignItems: 'center',
              width: '200px',
              height: '30px',
              backgroundColor: '#212121',
              boxShadow: 'inset -2px 2px 4px #0c0c0c',
              borderRadius: '15px',
              position: 'relative',
            }}>
              <div style={{
                height: '20px',
                width: '0%',
                background: 'linear-gradient(0deg, rgba(222, 74, 15, 1) 0%, rgba(249, 199, 79, 1) 100%)',
                borderRadius: '10px',
                animation: 'loading 3s ease-out forwards',
              }}></div>
            </div>
            <p style={{
              display: 'block',
              fontSize: '1.1rem',
              marginTop: '2px',
            }}>
              Telegram activity verified
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            opacity: 0,
            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
            transform: 'translateY(20px)',
          }} className="step visible">
            <p style={{
              margin: 0,
              fontSize: '1.2rem',
              animation: 'glow 2s infinite alternate, pulse 3s infinite',
            }}>
              Allocating VIC's...
            </p>
            <div style={{
              margin: '3px 0',
              display: 'flex',
              alignItems: 'center',
              width: '200px',
              height: '30px',
              backgroundColor: '#212121',
              boxShadow: 'inset -2px 2px 4px #0c0c0c',
              borderRadius: '15px',
              position: 'relative',
            }}>
              <div style={{
                height: '20px',
                width: '0%',
                background: 'linear-gradient(0deg, rgba(222, 74, 15, 1) 0%, rgba(249, 199, 79, 1) 100%)',
                borderRadius: '10px',
                animation: 'loading 3s ease-out forwards',
              }}></div>
            </div>
            <p style={{
              display: vicAmount !== null ? 'block' : 'none',
              fontSize: '1.1rem',
              marginTop: '2px',
            }}>
              {vicAmount !== null ? `Allocated VIC's: ${vicAmount}` : 'Loading VIC allocation...'}
            </p>
          </div>

          <button style={{
            display: 'none',
            marginTop: '15px',
            animation: 'fade-in 0.5s ease-in-out forwards',
            fontFamily: 'inherit',
            fontWeight: '500',
            fontSize: '18px',
            borderRadius: '0.8em',
            cursor: 'pointer',
            border: 'none',
            background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
            color: 'ghostwhite',
            overflow: 'hidden',
            animation: 'pulse 1.5s infinite',
          }} id="nextButton">
            <span>Next!</span>
          </button>
        </div>

        {user ? (
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
          }}>
            <p style={{
              fontSize: '20px',
              marginBottom: '8px',
            }}>
              Hello, <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
                {user.username ? `@${user.username}` : user.first_name}
              </span>! 👋
            </p>
            <p style={{
              color: '#4b5563',
            }}>
              Account age: {accountAge} days. We've allocated {vicAmount} VIC's based on that.
            </p>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
          }}>
            <p style={{
              fontSize: '20px',
              marginBottom: '8px',
            }}>
              Welcome, visitor! 👋
            </p>
            <p style={{
              color: '#4b5563',
            }}>
              Please open this page through Telegram.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
