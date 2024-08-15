const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripeKey = require("stripe")(process.env.STRIPE_KEY);


// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    const paymentIntent = await stripeKey.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // OK - created....
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});

// - Listen command
app.listen(7000, (err) => {
  if (err) throw err;
  console.log(
    `Amazon clone server running on PORT: 7000`
  );
});

