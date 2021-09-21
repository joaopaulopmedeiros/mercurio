const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

export async function connect() {
  const uri = await process.env.MONGO_URL;

  const mongooseOpts = {
    useNewUrlParser: true
  };

  await mongoose.connect(uri, mongooseOpts);
}

export async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}
