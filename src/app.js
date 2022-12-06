const express = require('express');
const loginRouter = require('./routes/loginRoutes');

// ...

const app = express();
app.use(express.json());

// Routes
app.use('/login', loginRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
