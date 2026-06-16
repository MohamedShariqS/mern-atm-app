const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'ATM Backend is running perfectly!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
// Login Route: Verifies account number and PIN
app.post('/api/login', async (req, res) => {
  const { accountNumber, pin } = req.body;

  try {
    // 1. Look for the account in MongoDB
    const account = await Account.findOne({ accountNumber });

    // 2. If account doesn't exist, return 404
    if (!account) {
      return res.status(404).json({ error: "Account not found!" });
    }

    // 3. Check if the PIN matches
    if (account.pin !== pin) {
      return res.status(401).json({ error: "Incorrect PIN!" });
    }

    // 4. If everything is correct, send back the account details (excluding the PIN for security)
    res.json({
      message: "Login successful!",
      account: {
        name: account.name,
        accountNumber: account.accountNumber,
        balance: account.balance
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});