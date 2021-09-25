import mongoose, { ConnectOptions } from 'mongoose';

class ConnectionManager {
  async initializeMongoDBConnection() {
    const options: ConnectOptions = {
      autoIndex: true
    };
    await mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, options);
  }
  async closeMongoDBConnection() {
    await mongoose.connection.close();
  }
}

export default ConnectionManager;
