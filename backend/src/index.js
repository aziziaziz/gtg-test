import express from 'express';
import axios from 'axios';
import cors from 'cors';

import mongoConn from '../modules/mongo.js';
const currenciesdb = new mongoConn('g2gdb', 'currencies');

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }));

app.get('/', (req, res) => {
  res.send('NodeJS is running');
});

app.get('/currencies', async (req, res) => {
  let currencies = await currenciesdb.getCollection();
  let savedCount = await currencies.find().count();

  if (savedCount == 0) {
    await currencies.insertOne({ 'time': new Date().getTime() });
    await currencies.insertMany(await callAPI());
  } else {
    let time = await currencies.find({ time: { $ne: null } }).toArray();
    if (new Date().getTime() - time[0]['time'] > 17280000) {
      await currencies.updateOne({ _id: time[0]['_id'] }, { $set: { time: new Date().getTime() } });
      await currencies.deleteMany({ time: null });
      await currencies.insertMany(await callAPI());
    }
  }
  
  let saved = await currencies.find().skip(1);
  let result = [];
  await saved.forEach(s => result.push(s));
  console.log('from db');
  res.status(200).send(result);
});

async function callAPI() {
  console.log('from api');
  let currencies = await axios.get('https://free.currconv.com/api/v7/currencies?apiKey=56874a83837f67e445a9');

  let allResult = [];
  Object.keys(currencies.data.results).forEach((k) => {
    let obj = currencies.data.results[k];
    allResult.push({
      id: obj['id'],
      symbol: obj['currencySymbol'] ? obj['currencySymbol'] : '',
      name: obj['currencyName']
    });
  });
  return allResult;
}

app.listen('3000', () => {
  console.log('App is running in http://localhost:3000');
});