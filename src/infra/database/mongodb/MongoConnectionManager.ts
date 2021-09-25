import mongoose, { ConnectOptions } from 'mongoose';

class MongoConnectionManager {
  async initializeConnection() {
    const options: ConnectOptions = {
      autoIndex: true
    };
    await mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, options);
  }
  async closeConnection() {
    await mongoose.connection.close();
  }
}

export default MongoConnectionManager;
