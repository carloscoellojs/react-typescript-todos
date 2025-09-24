const express = require('express');
const app = express();
const PORT = process.env.PORT || 6001;
const mongoose = require('mongoose');
const path = require('path');

const mongodb_password = encodeURIComponent(process.env.MONGODB_PASSWORD);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${mongodb_password}@${process.env.SERVERLESS_INSTANCE}`
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/dist')));

const UserController = require('./controllers/UserController.cjs');
const TodoController = require('./controllers/TodoController.cjs');

app.use('/api/v1', UserController);
app.use('/api/v1', TodoController);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
