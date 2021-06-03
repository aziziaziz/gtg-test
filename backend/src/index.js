import express from 'express';
import axios from 'axios';
import cors from 'cors';

import mongoConn from '../modules/mongo.js';
const currenciescol = new mongoConn('g2gdb', 'currencies');
const conversioncol = new mongoConn('g2gdb', 'conversion');

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }));

app.get('/', (req, res) => {
  res.send('NodeJS is running');
});

app.get('/currencies', async (req, res) => {
  let currencies = await currenciescol.getCollection();
  let savedCount = await currencies.find().count();

  if (savedCount == 0) {
    await currencies.insertOne({ 'time': new Date().getTime() });
    await currencies.insertMany(await getAllCurrencies());
  } else {
    let time = await currencies.find({ time: { $ne: null } }).toArray();
    if (new Date().getTime() - time[0]['time'] > 17280000) {
      await currencies.updateOne({ _id: time[0]['_id'] }, { $set: { time: new Date().getTime() } });
      await currencies.deleteMany({ time: null });
      await currencies.insertMany(await getAllCurrencies());
    }
  }
  
  let saved = await currencies.find().skip(1);
  let result = [];
  await saved.forEach(s => result.push(s));
  console.log('from db');
  res.status(200).send(result);
});

app.get('/convert', async (req, res) => {
  let to = req.query.to;
  let from = req.query.from;

  if (to == from) {
    res.status(406).send({});
    return;
  }

  let query = { // (to = to AND from = from) OR (to = from AND from = to)
    $or: [
      {
        $and: [
          { 'to': to },
          { 'from': from }
        ]
      },
      {
        $and: [
          { 'to': from },
          { 'from': to }
        ]
      }
    ]
  };

  let conversion = await conversioncol.getCollection();
  let savedConversion = await conversion.find(query);

  let result = null;
  if (await savedConversion.count() > 0) {
    result = (await savedConversion.toArray())[0];

    if (new Date().getTime() - result['time'] > 17280000) {
      let live = await getLiveConversion(to, from);

      await conversion.updateOne({ _id: result['_id'] }, {
        $set: { 
          time: new Date().getTime(),
          to: to,
          from: from,
          value: live['value'],
          reversed: live['reversed']
        }
      });
      
      result = live;
    }
  } else {
    let live = await getLiveConversion(to, from);
    await conversion.insertOne(live);
    result = live;
  }

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(204).send(null);
  }
});

async function getAllCurrencies() {
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

async function getLiveConversion(to, from) {
  console.log('call live');
  let convert = await axios.get(`https://free.currconv.com/api/v7/convert?apiKey=56874a83837f67e445a9&q=${from}_${to},${to}_${from}`);
  
  let key1 = Object.keys(convert.data.results)[0];
  let key2 = Object.keys(convert.data.results)[1];
  
  return { to: to, from: from, value: convert.data.results[key1]['val'], reversed: convert.data.results[key2]['val'], time: new Date().getTime() };
}

app.listen('3000', () => {
  console.log('App is running in http://localhost:3000');
});