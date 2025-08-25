require('dotenv').config({ path: __dirname + '/.env' });
// Use the app creator so we can run locally and on Vercel serverless
const createApp = require('./app');

const app = createApp();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
