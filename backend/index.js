require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./model/User");


const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { defaultHoldings, defaultPositions, defaultFunds } = require("./utils/defaultData");
const { FundsModel } = require("./model/FundsModel");


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: [
    "https://tradeonix-frontend.vercel.app",
    "https://tradeonix-dashboard.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors());

app.use(bodyParser.json());
app.use(cookieParser());

/* ================= JWT UTILS ================= */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ================= AUTH MIDDLEWARE ================= */
const protect = require("./middleware/authMiddleware");

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });
/* ================= AUTH ROUTES ================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email" });

    if (username.length < 3) return res.status(400).json({ message: "Username too short" });

    if (password.length < 6) return res.status(400).json({ message: "Password too short" });


   const existingEmail = await UserModel.findOne({ email });
    const existingUsername = await UserModel.findOne({ username });

    if (existingEmail && existingUsername) {
      return res.status(400).json({
        message: "User already exist"
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already used"
      });
    }

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });
    await FundsModel.create({
  ...defaultFunds,
  userId: user._id,
});

   
const userHoldings = defaultHoldings.map(item => ({
  ...item,
  userId: user._id
}));

await HoldingsModel.insertMany(userHoldings);


const userPositions = defaultPositions.map(item => ({
  ...item,
  userId: user._id
}));

await PositionsModel.insertMany(userPositions);

await FundsModel.create({
  userId: user._id,

  availableMargin: 50000,
  usedMargin: 0,
  availableCash: 50000,
  openingBalance: 50000,
  payin: 0,

  span: 0,
  deliveryMargin: 0,
  exposure: 0,
  optionPremium: 0,

  collateralLiquid: 0,
  collateralEquity: 0,
});

    const token = generateToken(user);



    res.json({
  message: "Signup successful",
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email
  }
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);


   res.json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email
  }
});
    

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGOUT
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// GET CURRENT USER (Dashboard greeting)
app.get("/api/me", protect, async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");
  res.json(user);
  console.log("COOKIE RECEIVED:", req.cookies);
});

app.get("/allHoldings", protect, async (req, res) => {
  const data = await HoldingsModel.find({
    userId: req.user.id
  });

  res.json(data);
});

app.get("/allPositions", protect, async (req, res) => {
  const data = await PositionsModel.find({
    userId: req.user.id
  });

  res.json(data);
});

app.post("/newOrder", protect, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {

    // 🔥 GET USER FUNDS
    const funds = await FundsModel.findOne({
      userId: req.user.id
    });

    // ================= BUY =================
    if (mode === "BUY") {

      const totalCost = qty * price;

      // 🔥 CHECK AVAILABLE CASH
      if (funds.availableCash < totalCost) {
        return res.status(400).json({
          message: "Insufficient funds",
        });
      }

      // 🔥 UPDATE FUNDS
      funds.availableCash -= totalCost;
      funds.usedMargin += totalCost;

      await funds.save();

      // 🔥 FIND HOLDING
      let existing = await HoldingsModel.findOne({
        name,
        userId: req.user.id,
      });

      // 🔥 IF STOCK ALREADY EXISTS
      if (existing) {

        const totalQty = existing.qty + qty;

        const totalAvgCost =
          existing.avg * existing.qty + price * qty;

        existing.avg = totalAvgCost / totalQty;
        existing.qty = totalQty;

        await existing.save();

      } else {

        // 🔥 CREATE NEW HOLDING
        const newHolding = new HoldingsModel({
          userId: req.user.id,
          name,
          qty,
          avg: price,
          price,
        });

        await newHolding.save();
      }
    }

    // ================= SELL =================
    if (mode === "SELL") {

      // 🔥 FIND HOLDING
      let existing = await HoldingsModel.findOne({
        name,
        userId: req.user.id,
      });

      // 🔥 NO STOCK FOUND
      if (!existing) {
        return res.status(400).json({
          message: "Stock not owned",
        });
      }

      // 🔥 NOT ENOUGH QUANTITY
      if (existing.qty < qty) {
        return res.status(400).json({
          message: "Insufficient stock to sell",
        });
      }

      // 🔥 ADD MONEY BACK
      const totalValue = qty * price;

      funds.availableCash += totalValue;
      funds.usedMargin -= totalValue;

      if (funds.usedMargin < 0) {
        funds.usedMargin = 0;
      }

      await funds.save();

      // 🔥 REDUCE HOLDING QTY
      existing.qty -= qty;

      // 🔥 DELETE IF ZERO
      if (existing.qty === 0) {

        await HoldingsModel.deleteOne({
          name,
          userId: req.user.id,
        });

      } else {

        await existing.save();
      }
    }

    // ================= SAVE ORDER =================
    const newOrder = new OrdersModel({
      userId: req.user.id,
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    res.json({
      message: "Order processed successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


app.get("/newOrder", protect, async (req, res) => {
  const orders = await OrdersModel.find({
    userId: req.user.id
  });

  res.json(orders);
});

app.get("/funds", protect, async (req, res) => {
  const funds = await FundsModel.findOne({
    userId: req.user.id,
  });

  res.json(funds);
});
app.post("/addFunds", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const funds = await FundsModel.findOne({
      userId: req.user.id,
    });

    if (!funds) {
      return res.status(404).json({
        message: "Funds account not found",
      });
    }

    funds.availableMargin += amount;
    funds.availableCash += amount;
    funds.payin += amount;

    await funds.save();

    res.json({
      message: "Funds added successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
app.post("/withdrawFunds", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const funds = await FundsModel.findOne({
      userId: req.user.id,
    });

    if (!funds) {
      return res.status(404).json({
        message: "Funds account not found",
      });
    }

    if (funds.availableCash < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    funds.availableMargin -= amount;
    funds.availableCash -= amount;

    await funds.save();

    res.json({
      message: "Funds withdrawn successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});