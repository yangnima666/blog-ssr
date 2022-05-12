import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';
import { User, UserAuth } from './entity';

let connectionReadyPromise: Promise<Connection> | null = null;

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }
      const connection = await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [User, UserAuth],
        synchronize: false,
        logging: true,
      });
      return connection;
    })();
  }
  return connectionReadyPromise;
};
