import 'dotenv/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { loginService } from './src/services/authenticationService.js';
import User from './src/models/User.js';

async function testFullLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const tempUsername = 'testuser_' + Date.now();
        const newUser = await User.create({
            fullname: 'Test User',
            username: tempUsername,
            password: 'Password123!'
        });
        console.log('Created temp user:', tempUsername);
        
        try {
            const loginResult = await loginService(tempUsername, 'Password123!');
            console.log('Login Result Success:', !!loginResult.token);
            console.log('Token:', loginResult.token.substring(0, 20) + '...');
        } catch (err) {
            console.log('Caught Error in login sequence:', err);
        }
        
        // Clean up
        await User.deleteOne({ _id: newUser._id });
        console.log('Cleaned up temp user');

    } catch (err) {
        console.error('Test script failed:', err);
    } finally {
        await mongoose.connection.close();
    }
}

testFullLogin();
