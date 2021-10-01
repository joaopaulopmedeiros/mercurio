import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

class MongoConnectionManager {
  async initializeConnection() {
    const options: any = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const url: string = process.env.MONGO_DB_CONNECTION || 'mongodb://127.0.0.1:27017';
    await mongoose.connect(url, options);
  }

  async closeConnection() {
    await mongoose.connection.close();
  }
}

export default MongoConnectionManager;
