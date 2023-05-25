import express from 'express';
import payload from 'payload';
import { opengraph } from './endpoints/opengraph';

require('dotenv').config();
const app = express();

// Check required Environment variables
if(process.env.PAYLOAD_SECRET === undefined)
  throw new Error("Aborting: PAYLOAD_SECRET not defined...")
if(process.env.MONGODB_URI === undefined)
  throw new Error("Aborting: MONGODB_URI not defined...")

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here
  app.get("/opengraph/parse", opengraph.parse)

  app.listen(3000);
}

start();
