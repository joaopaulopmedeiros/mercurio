import MongoConnectionManager from './infra/database/mongodb/MongoConnectionManager';
import HttpConnectionManager from './infra/http/HttpConnectionManager';

new MongoConnectionManager().initializeConnection();
new HttpConnectionManager().initializeConnection();
