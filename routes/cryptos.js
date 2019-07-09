const express = require('express');
const fetch = require('node-fetch');
const Cryptos = require('../models/Cryptos');
const router = express.Router();
const your_api_key =
  '7eb92164db39071db1598d459c220ed7eb17f89eb09f8fbbb7046c90f818e923';
let timestampObject = {};

// use this to write data to mongo db
// let coins;
// fetch('https://min-api.cryptocompare.com/data/all/coinlist')
//   .then(res => res.json())
//   .then(async res => {
//     coins = { ...res.Data };
//     let coinNames = Object.keys(coins).sort();
//     // console.log('coinnames', coinNames);
//     console.log('btc', coins['BTC']);

//     //https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&allData=true
//     let promises = ['BTC', 'LTC'].map(coinName =>
//       fetch(
//         `https://min-api.cryptocompare.com/data/histoday?fsym=${coinName}&tsym=USD&aggregate=1&allData=true&api_key=${your_api_key}`
//       )
//         .then(res => {
//           return res.json();
//         })
//         .then(data => {
//           return { ...data, name: coinName };
//         })
//     );
//     let resolved = await Promise.all(promises);
//     // let json = await Promise.all(resolved.map(r => r.json()));
//     resolved.forEach(data => {
//       if (data.Data && data.Data.length > 0) {
//         data.Data.forEach(async item => {
//           // if timeperiod doesnt exist create
//           var conditions = { timestamp: item.time };

//           var update = {
//             $addToSet: { cryptos: { name: data.name, ...item } }
//           };
//           Cryptos.findOneAndUpdate(
//             conditions,
//             update,
//             { new: true, upsert: true },
//             (err, res) => {
//               console.log('err:', err);
//               return;
//             }
//           );
//         });
//       }
//     });
//   });

/* GET all cryptos. */
router.get('/all', async function(req, res, next) {
  //add fetch for each coinName
});

/* GET coins listing based on tiemstamp. */
router.get('/:timestamp', async function(req, res, next) {
  //all coins data at timestamp
  let cryptos = await Cryptos.find({ timestamp: req.params.timestamp });
  res.json(cryptos);
});

router.get('/:coinName', function(req, res, next) {
  res.json({
    id: 1,
    coinName: 'BTC',
    data: [
      {
        time: 1279152000,
        close: 0.07921,
        high: 0.09307,
        low: 0.04951,
        open: 0.04951,
        volumefrom: 1506.01,
        volumeto: 118.59
      },
      {
        time: 1279756800,
        close: 0.0589,
        high: 0.08181,
        low: 0.05,
        open: 0.07921,
        volumefrom: 15251.28,
        volumeto: 882.23
      }
    ]
  });
});

module.exports = router;
