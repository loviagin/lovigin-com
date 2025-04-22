import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global type
type GlobalWithMongoose = typeof globalThis & {
    mongoose: MongooseCache | undefined;
};

// Use the extended global type
const globalWithMongoose = global as GlobalWithMongoose;
let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached?.conn) {
        return cached.conn;
    }

    if (!cached?.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached = globalWithMongoose.mongoose = {
            conn: null,
            promise: mongoose.connect(uri, opts).then((mongoose) => {
                return mongoose;
            })
        };
    }

    try {
        const conn = await cached.promise;
        cached.conn = conn;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB; 