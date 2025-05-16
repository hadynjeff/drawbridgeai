const express = require('express');
const path = require('path');
const app = express();

// Use the port provided by Azure or default to 3000
const port = process.env.PORT || 3000;

// Enable JSON parsing for API requests
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Mount your API route
app.use('/api/generate', require('./api/generate'));

// SPA fallback — send index.html for any unknown routes (like /about)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
