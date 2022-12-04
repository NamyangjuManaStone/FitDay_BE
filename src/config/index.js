import dotenv from 'dotenv';

dotenv.config();

export const { MONGO_URI, JWT_KEY } = process.env;
