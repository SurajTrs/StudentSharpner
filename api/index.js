const serverless = require('serverless-http');
const createApp = require('../server/app');

// Ensure env is loaded (for local vercel dev usage)
require('dotenv').config({ path: __dirname + '/../server/.env' });

const app = createApp();

module.exports = (req, res) => {
  // Strip '/api' so Express routes mounted at '/api/*' work under Vercel's /api/*
  const handler = serverless(app, { basePath: '/api' });
  return handler(req, res);
};
