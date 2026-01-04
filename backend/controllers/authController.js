// controllers/authController.js

const login = (req, res) => {
  const { email, password } = req.body;

  // Static credentials check
  if (email === 'saishambhavi@1234' && password === '123456') {  // Change this password!
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      // You can add a token here later if needed
      user: { email: 'saishambhavi@1234' }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
};

module.exports = { login };