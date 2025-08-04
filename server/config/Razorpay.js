const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.Razorpay_KEY,     // Trim removes \n or spaces
  key_secret: process.env.Razorpay_SECRET
});
