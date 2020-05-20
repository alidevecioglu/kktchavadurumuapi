var config = require('./config');

const express = require('express')
var levelup = require('levelup')
var leveldown = require('leveldown')
const axios = require('axios')
 

const app = express()
var db = levelup(leveldown('./mydb'))

const apikey = config.apikey
const dbkey = config.dbkey



app.get('/', function (req, res) {
    
    res.send('hello world')
  
})

app.post('/db', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("DB İsteği Geldi İp : " + ip)
    if (req.body.key == config.dbkey) {
      console.log("Gelen Key Doğrulandı İşleme Alınıyor");
      const istasyon = req.body.istasyon
      const tarih = req.body.tarih
      const hava = req.body.hava
      const sicaklik = req.body.sicaklik
      const nem = req.body.nem
      const basinc = req.body.basinc
      const gorus = req.body.gorus
      const ruzgar = req.body.ruzgar

      console.log("Gelenler : " + istasyon + tarih + hava + sicaklik + nem + basinc + gorus + ruzgar)
      }
     else {
      console.log("Gelen Key Yanlış Çöpe Atılıyor");
    }

});

app.get('/api', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Api İsteği Geldi İp : " + ip)

    if ( req.query.api == "123") {

        if ( req.query.sehir == "iskele") {
            res.json({ guncellenmetarihi: "20.05.2020 09:00", sehir: "Iskele", hava: "HAVA AÇIK", sicaklik: "37.3°C", isbasicaklik: "10.6°C", basinc: "1010.3 hPa", gorus: "10KM", ruzgar: "Kuzeydoğudan (30) 12 kt."})
        } else {res.send('Bilinmeyen Sehir')}

    } else {res.send('Api Key Doğrulanamadı')}
    }) 

app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));