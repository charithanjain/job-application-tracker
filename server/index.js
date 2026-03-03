require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Helmet for security headers
app.use(helmet());

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  process.env.FRONTEND_URL, // deployed frontend from Render env
].filter(Boolean); // remove undefined

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests like Postman/curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Routes
app.use("/", authRoutes);
app.use("/jobs", jobRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
