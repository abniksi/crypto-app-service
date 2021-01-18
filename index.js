const express = require('express');
const cryptoRouter = require('./routes/cryptoRoutes');
const app = express();
const apiPort = 8000;

app.use('/api', cryptoRouter);

app.listen(apiPort, () => console.log(`Server running on port ${8000}`))