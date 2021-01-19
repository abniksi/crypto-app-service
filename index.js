const express = require('express');
const cryptoRouter = require('./routes/cryptoRoutes');
const app = express();
const cors = require('cors')
const apiPort = 8000;

app.use(cors());
app.use('/api', cryptoRouter);

app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${8000}`))