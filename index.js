import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {typeDefs} from './models/typeDefs.js';
import {resolvers} from './resolvers/resolvers.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env'});

const Db = process.env.ATLAS_URI;
const app = express();
const httpServer = http.createServer(app);

 mongoose.connect(Db, {useNewUrlParser: true})
  .then(() => {
    console.info('Connected to CookBook DataBase');
  })
  .catch((error) => {
    console.error(error);
  })

// await mongoose.connect(Db);
// console.info('Connected to CookBook DataBase');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(  
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
console.info(`🚀 Server ready at ${process.env.PORT}`);

// mongoose.connect(Db, {useNewUrlParser: true})
//   .then(() => {
//     console.info('Connected to CookBook DataBase');
//     return server.listen({ port: process.env.PORT });
//   })
//   .then((res) => {
//     console.info(`🚀 Server ready at ${re.url}`);
//   })
