const express = require('express');
const bodyParser = require('body-parser');
const swaggerDoc = require('./swagger');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

swaggerDoc(app);

const tasksRoutes = require('./tasks');
app.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;
