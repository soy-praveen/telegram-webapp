import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [eligibility, setEligibility] = useState({
    isAccountOldEnough: false,
    hasUsername: false,
    isPremium: false,
  });

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
        
        // Check eligibility criteria
        const userInfo = tg.initDataUnsafe.user;
        setEligibility({
          hasUsername: !!userInfo.username,
          isPremium: !!userInfo.is_premium,
          // Note: Telegram doesn't directly provide account age
          // You might need to check this through your bot's API
          isAccountOldEnough: true // Placeholder
        });
      }
    }
  }, []);

  const getEligibilityStatus = () => {
    const criteria = [
      { name: 'Has Username', status: eligibility.hasUsername },
      { name: 'Telegram Premium', status: eligibility.isPremium },
      { name: 'Account Age Valid', status: eligibility.isAccountOldEnough },
    ];

    const totalCriteria = criteria.length;
    const metCriteria = criteria.filter(c => c.status).length;
    
    return {
      criteria,
      isEligible: metCriteria === totalCriteria,
      progress: Math.round((metCriteria / totalCriteria) * 100)
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Airdrop Eligibility Check
        </h1>
        
        {user ? (
          <div className="space-y-6">
            {/* User Info Section */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">User Information</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Name: <span className="font-medium">{user.first_name} {user.last_name}</span>
                </p>
                <p className="text-gray-700">
                  Username: <span className="font-medium">{user.username ? `@${user.username}` : 'Not set'}</span>
                </p>
                <p className="text-gray-700">
                  Language: <span className="font-medium">{user.language_code?.toUpperCase() || 'Not set'}</span>
                </p>
                <p className="text-gray-700">
                  Premium Status: <span className={`font-medium ${user.is_premium ? 'text-green-600' : 'text-red-600'}`}>
                    {user.is_premium ? 'Premium User' : 'Not Premium'}
                  </span>
                </p>
              </div>
            </div>

            {/* Eligibility Section */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Eligibility Status</h2>
              <div className="space-y-3">
                {getEligibilityStatus().criteria.map((criterion, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{criterion.name}</span>
                    <span className={`font-medium ${criterion.status ? 'text-green-600' : 'text-red-600'}`}>
                      {criterion.status ? '✓' : '✗'}
                    </span>
                  </div>
                ))}

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${getEligibilityStatus().progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2 font-medium">
                    Progress: {getEligibilityStatus().progress}%
                  </p>
                </div>

                {/* Final Status */}
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  getEligibilityStatus().isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {getEligibilityStatus().isEligible 
                    ? '🎉 Congratulations! You are eligible for the airdrop!'
                    : '❌ Sorry, you do not meet all eligibility criteria yet.'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-2">
              Welcome, visitor! 👋
            </p>
            <p className="text-gray-600">
              Please open this page through Telegram to check your eligibility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
