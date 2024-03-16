const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        const mongoURL = process.env.MONGO_URL;
        console.log('MongoDB URL:', mongoURL);
        if (!mongoURL) {
            throw new Error('MongoDB URL is missing in environment variables.');
        }
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
};

module.exports = { db };
