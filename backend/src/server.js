import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authenticationRoutes from './routes/authenticationRoute.js';
import destinationRoutes from './routes/destinationRoutes.js';
import travelPlanRoutes from './routes/travelPlanRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected")
    app.use("/destination", destinationRoutes);
    app.use("/auth", authenticationRoutes);
    app.use("/travel-plan", travelPlanRoutes);

    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
}

startServer();
