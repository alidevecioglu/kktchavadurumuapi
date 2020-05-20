var config = require('./config');

const express = require('express')
var levelup = require('levelup')
var leveldown = require('leveldown')
const axios = require('axios')
const request = require("request-promise");
const cheerio = require("cheerio");
 

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

});

app.get('/api', (req, res) => {

// Finds
function limasol(sehir) {return sehir.istasyon === 'limasol';}
function ercan(sehir) {return sehir.istasyon === 'ercan';}
function larnaka(sehir) {return sehir.istasyon === 'larnaka';}
function baf(sehir) {return sehir.istasyon === 'baf';}
function iskele(sehir) {return sehir.istasyon === 'iskele';}
function gazimagusa(sehir) {return sehir.istasyon === 'gazimagusa';}
function guzelyurt(sehir) {return sehir.istasyon === 'guzelyurt';}
function lefke(sehir) {return sehir.istasyon === 'lefke';}
function akdeniz(sehir) {return sehir.istasyon === 'akdeniz';}
function yesilirmak(sehir) {return sehir.istasyon === 'yesilirmak';}
function girne(sehir) {return sehir.istasyon === 'girne';}
function lefkosa(sehir) {return sehir.istasyon === 'lefkosa';}
function gecitkale(sehir) {return sehir.istasyon === 'gecitkale';}
function dipkarpaz(sehir) {return sehir.istasyon === 'dipkarpaz';}
function yenierenkoy(sehir) {return sehir.istasyon === 'yenierenkoy';}
function alsancak(sehir) {return sehir.istasyon === 'alsancak';}


String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ','g')
        .replace('Ü','u')
        .replace('Ş','s')
        .replace('I','i')
        .replace('İ','i')
        .replace('Ö','o')
        .replace('Ç','c')
        .replace('ğ','g')
 		.replace('ü','u')
        .replace('ş','s')
        .replace('ı','i')
        .replace('ö','o')
        .replace('ç','c');
};
 
async function main() {
    const result = await request.get("http://kktcmeteor.org/sondurumlar/kktc-geneltablo");
    const $ = cheerio.load(result);
    const scrapedData = [];
    $("#ctl01 > div.container.body-content > div.container > div > div.col-md-9 > table > tbody > tr").each((index, element) => {
        if (index === -1) return true;
        const tds = $(element).find("td");
        const ths = $(element).find("th");
        const isim = String($(ths[0]).text()).toLocaleLowerCase('en-US');
        const istasyon = isim.turkishtoEnglish();
        const tarih = $(tds[0]).text();
        const hava = $(tds[2]).text();
        const sicaklik = $(tds[3]).text();
        const nem = $(tds[4]).text();
        const basinc = $(tds[5]).text();
        const gorus = $(tds[6]).text();
        const ruzgar = $(tds[7]).text();
        const tableRow = { istasyon, tarih, hava, sicaklik, nem, basinc, gorus, ruzgar };
        scrapedData.push(tableRow);
    });
    
    const ercanist = scrapedData.find(ercan)

    res.json({ guncellenmetarihi: ercanist.tarih, sehir: "Ercan", hava: ercanist.hava, sicaklik: ercanist.sicaklik,  basinc: ercanist.basinc, nem: ercanist.nem, gorus: ercanist.gorus, ruzgar: ercanist.ruzgar})

}
main();



/*     var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Api İsteği Geldi İp : " + ip)

    if ( req.query.api == "123") {

        if ( req.query.sehir == "iskele") {
            res.json({ guncellenmetarihi: "20.05.2020 09:00", sehir: "Iskele", hava: "HAVA AÇIK", sicaklik: "37.3°C", isbasicaklik: "10.6°C", basinc: "1010.3 hPa", gorus: "10KM", ruzgar: "Kuzeydoğudan (30) 12 kt."})
        } else {res.send('Bilinmeyen Sehir')}

    } else {res.send('Api Key Doğrulanamadı')} */
}) 

app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));