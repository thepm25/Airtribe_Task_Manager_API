const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { NotFoundError, ValidationError } = require('../src/exceptions/customErrors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Include taskRoutes
const taskRoutes = require('../src/routes/taskRoutes');
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
    } else {
      // Log and respond to other unhandled errors
      logger.error('Global error handler:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});