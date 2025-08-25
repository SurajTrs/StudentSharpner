const serverless = require('serverless-http');
const createApp = require('../server/app');

// Ensure env is loaded (for local vercel dev usage)
require('dotenv').config({ path: __dirname + '/../server/.env' });

const app = createApp();

module.exports = (req, res) => {
  const handler = serverless(app);
  return handler(req, res);
};
