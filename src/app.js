const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const usersRouter = require('./routes/usersRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/login', loginRouter);
app.use('/user', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
