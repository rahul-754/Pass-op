const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
