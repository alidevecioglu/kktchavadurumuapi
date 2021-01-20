const request = require("request-promise")
var leveldown = require('leveldown')
const cheerio = require("cheerio")
const express = require('express')
var config = require('./config')
var levelup = require('levelup')
const axios = require('axios')
var pug = require('pug');
 
const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ limasol: [], ercan: [], larnaka: [], baf: [], iskele: [], gazimagusa: [], lefke: [], akdeniz: [], yesilirmak: [], girne: [], lefkosa: [], gecitkale: [], dipkarpaz: [], yenierenkoy: [], alsancak: [], guzelyurt: [], uyarilar: [] })
  .write()

  String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ','g')
        .replace('Ü','u')
        .replace('Ş','s')
        .replace('I','i')
        .replace('Ö','o')
        .replace('Ç','c')
        .replace('ğ','g')
 		.replace('ü','u')
        .replace('ş','s')
        .replace('ı','i')
        .replace('ö','o')
        .replace('ç','c');
};

async function anlikdbupdate() {
    const result = await request.get("http://kktcmeteor.org/sondurumlar/kktc-geneltablo");
    const $ = cheerio.load(result);
    const scrapedData = [];
    $("#ctl01 > div.container.body-content > div.container > div > div.col-md-9 > table > tbody > tr").each((index, element) => {
        if (index === -1) return true;
        const tds = $(element).find("td");
        const ths = $(element).find("th");
        const isim = String($(ths[0]).text());
        const istasyon = isim.toLowerCase();
        const tarih = $(tds[0]).text();
        const hava = $(tds[2]).text();
        const sicaklik = $(tds[3]).text();
        const nem = $(tds[4]).text();
        const basinc = $(tds[5]).text();
        const gorus = $(tds[6]).text();
        const ruzgar = $(tds[7]).text();
        if (isim == "İskele") { var ist = "iskele"} else {var ist = istasyon.turkishtoEnglish()}

         db.get(ist)
        .remove({ id: 1 })
        .write()
    
        db.get(ist)
        .push({ id: 1, istasyon: ist, tarih: tarih, hava: hava, sicaklik: sicaklik, nem: nem, basinc: basinc, gorus: gorus, ruzgar: ruzgar})
        .write() 
    });

    console.log("Anlik DB Güncellendi")
}

async function uyarilardbupdate() {
    const result = await request.get("http://kktcmeteor.org/");
    const $ = cheerio.load(result);
    const scrapedData = [];
    const uyari = $("#ctl01 > div.highlightSection > div > div > div.col-md-8 > div > div > div > marquee > p").text()
    const uyaritrim = uyari.trim()
    const uyarifinal = uyaritrim.replace(/\s\s+/g, ' ')

    db.get("uyarilar")
    .remove({ id: 1 })
    .write()

    db.get("uyarilar")
    .push({ id: 1, uyarilar: uyarifinal})
    .write() 
    
    console.log("Uyarilar DB Güncellendi")
}

var minutes = config.dbtime, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log( config.dbtime + " Dakikaya Ayarlı DB Güncelleme Çalıştırılıyor");
  anlikdbupdate();
  uyarilardbupdate();
}, the_interval);

// Routes
app.get('/', function (req, res) {
    res.render('index')
})
app.get('/app', function (req, res) {
    res.send('Şehir Seçiniz')
})
app.get('/app/:sehir', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("/app/" + req.params.sehir + " Adresine istek geldi ip : " + ip)

    const veri = db.get(req.params.sehir)
                .find({ id: 1 })
                .value()
    if ( veri == undefined) {console.log(req.params.sehir  + " Sorgusu atıldı ama veritabanında yok diye sorgu reddedildi"); res.send('Bu şehir henüz veritabanımıza ekli değil'); return false } 
    else {
        res.send('Şehir : ' + veri.istasyon + ", Güncellenme Tarihi : " + veri.tarih + ", Hava : " + veri.hava + ", Sıcaklık : " + veri.sicaklik + ", Nem : " + veri.nem + ", Basınç : " + veri.basinc + ", Görüş : " + veri.gorus + ", Rüzgar : " + veri.ruzgar)    
    }
}) 

app.get('/debug', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if ( config.debug == 1) {
        anlikdbupdate();
        uyarilardbupdate();
        res.send('Debuging Aktif Veritabanı yenilendi')
        console.log("Debuging işlemi alındı ip : " + ip)
    } else {
        res.send('Debuging Aktif Değil')
    }
})

app.get('/api', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("/Api Sayfasına Gelen İstek : " + ip)
    res.render('api')
})

app.get('/api/anlik/:sehir', (req, res) => {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("/api/" + req.params.sehir + " Adresine istek geldi ip : " + ip)

    const veri = db.get(req.params.sehir)
                .find({ id: 1 })
                .value()
    if ( veri == undefined) {console.log(req.params.sehir  + " Sorgusu atıldı ama veritabanında yok diye sorgu reddedildi"); res.send('Bu şehir henüz veritabanımıza ekli değil'); return false } 
    else {res.json({ guncellenmetarihi: veri.tarih, sehir: veri.istasyon, hava: veri.hava, sicaklik: veri.sicaklik, basinc: veri.basinc, nem: veri.nem, gorus: veri.gorus, ruzgar: veri.ruzgar})}

}) 

app.get('/api/uyarilar', (req, res) => {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("/api/uyarilar Adresine istek geldi ip : " + ip)

    const veri = db.get("uyarilar")
                .find({ id: 1 })
                .value()
    res.json({ uyarilar: veri.uyarilar})
}) 

app.listen(process.env.PORT || config.port,
	() => console.log("Sunucu Çalışıyor. Port: "+ config.port));