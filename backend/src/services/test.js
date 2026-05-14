import bcrypt from 'bcrypt';

const hash = '$2b$10$IxZ4CLVtEr4cLf1hgilBV.yyd8dBhxfG6Sev1BZvk9sLe/3mpfYIu';
const passwordToTest = '@Aidukado123'; // Replace with the password you want to test

// Using async/await
const testPassword = async () => {
    const isMatch = await bcrypt.compare(passwordToTest, hash);
    console.log(`Password "${passwordToTest}" matches:`, isMatch);
    return isMatch;
};

testPassword();