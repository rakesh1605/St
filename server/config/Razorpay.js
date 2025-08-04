const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),     // Trim removes \n or spaces
  key_secret: process.env.RAZORPAY_SECRET.trim()
});
