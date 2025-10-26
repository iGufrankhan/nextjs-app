import mongoose from 'mongoose';

// Ensure you set MONGODB_URI in your environment (e.g. .env.local)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Improve mongoose behavior
mongoose.set('strictQuery', false);

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongooseGlobal: MongooseCache | undefined;
}

const globalWithMongoose = global as unknown as { _mongooseGlobal?: MongooseCache };

if (!globalWithMongoose._mongooseGlobal) {
  globalWithMongoose._mongooseGlobal = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  const cache = globalWithMongoose._mongooseGlobal!;

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const options = {
      // Recommended options (you can add auth or replica set options here)
      // keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true
    };

    cache.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cache.conn = await cache.promise;
    console.log('MongoDB connected successfully');
    return cache.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Do not exit the process in serverless / Next.js environment — throw instead
    throw error;
  }
};