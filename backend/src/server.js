require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    
    const destinationRoutes = require("./routes/destinationRoutes"); 
    const authenticationRoutes = require("./routes/authenticationRoute");

    app.use("/destination", destinationRoutes);
    app.use("/auth", authenticationRoutes);

    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
}

startServer();
