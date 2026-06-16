import { useState } from 'react';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  // 🔴 IMPORTANT: Replace this with your actual Vercel backend URL
  const API_URL = "https://mern-atm-app-tdmu.vercel.app/"; 

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber, pin }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Welcome, ${data.account.name}! Your balance is $${data.account.balance}`);
        // Later, we will redirect the user to a dashboard here!
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">ATM Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
            <input 
              type="text" 
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter 123456"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">PIN</label>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter 1234"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Insert Card / Login
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center font-medium text-gray-800 border">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;