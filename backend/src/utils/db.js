import mongoose from 'mongoose';

const connectDB = () => {
    return mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to DB'));
};

export default connectDB;
