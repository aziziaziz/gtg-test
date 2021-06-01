import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('NodeJS is running');
});

app.listen('3000', () => {
  console.log('App is running in http://localhost:3000');
});