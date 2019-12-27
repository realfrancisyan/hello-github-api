import * as mongoose from 'mongoose';
import { ADDRESS, PORT, USER, PASSWORD } from './server';

const createConn = (db: string) => {
  const url = `mongodb://${USER}:${PASSWORD}@${ADDRESS}:${PORT}/${db}?authSource=admin`;
  return mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

// db
const dbHelloGithub = 'helloGithub';

// create connection
const hg = createConn(dbHelloGithub);

export { mongoose, hg };
