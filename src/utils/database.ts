import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        console.log('process.env.DB_URI :' + process.env.DB_URI);
        await mongoose.connect(process.env.DB_URI || '');
    } catch (error) {
        console.log(error);
        console.log('DB接続に失敗しました');
        throw new Error;
    }
}