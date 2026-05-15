import 'dotenv/config';
import mongoose from 'mongoose';
import { loginService } from './src/services/authenticationService.js';
import User from './src/models/User.js';

async function testLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        // Try to login with a non-existent user
        try {
            await loginService('nonexistentuser', 'password');
        } catch (err) {
            console.log('Caught Error (non-existent):', err.name, '-', err.message);
        }

        // Try to login with a wrong password for an existing user (if any)
        const user = await User.findOne();
        if (user) {
            console.log('Testing with existing user:', user.username);
            try {
                await loginService(user.username, 'wrongpassword');
            } catch (err) {
                console.log('Caught Error (wrong password):', err.name, '-', err.message);
            }
        } else {
            console.log('No users in DB to test wrong password');
        }

    } catch (err) {
        console.error('Test script failed:', err);
    } finally {
        await mongoose.connection.close();
    }
}

testLogin();
