import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authenticationRoutes from './routes/authenticationRoute.js';
import destinationRoutes from './routes/destinationRoutes.js';
import travelPlanRoutes from './routes/travelPlanRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.set('trust proxy', 1);

async function startServer() {
  try {
    
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    
    // Routes
    app.use("/destination", destinationRoutes);
    app.use("/auth", authenticationRoutes);
    app.use("/travel-plan", travelPlanRoutes);
    
    
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK', timestamp: new Date() });
    });
    
    app.get('/', (req, res) => {
        res.json({ 
            message: 'API is running',
            version: '1.0.0',
            endpoints: ['/auth', '/destination', '/travel-plan', '/health']
        });
    });
    
    
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
            message: err.message || 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    });
    
    
    app.use('*splat', (req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
    
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    
    const gracefulShutdown = async () => {
        console.log('Shutting down gracefully...');
        server.close(async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    };
    
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1); 
  }
}

startServer();