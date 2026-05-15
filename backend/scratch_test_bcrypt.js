import bcrypt from 'bcrypt';

async function test() {
    try {
        const password = 'Password123!';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log('Hash:', hash);
        const isMatch = await bcrypt.compare(password, hash);
        console.log('Match:', isMatch);
    } catch (err) {
        console.error('Bcrypt Error:', err);
    }
}

test();
