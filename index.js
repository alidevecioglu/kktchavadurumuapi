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

app.post('/db', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Veri Tabanı Yazma Istedi Geldi İp Adresi : " + ip)
    
    if (req.body.key == dbkey) {
        console.log("Gelen Anahtar Doğru İşleme Alınıyor")

        var islem = [
            { type: 'put', key}
        ]

    }
    
  })

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