var config = require('./config');

const express = require('express')
var levelup = require('levelup')
var leveldown = require('leveldown')
const axios = require('axios')
const request = require("request-promise");
const cheerio = require("cheerio");
var pug = require('pug');
 

const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ limasol: [], ercan: [], larnaka: [], baf: [], iskele: [], gazimagusa: [], lefke: [], akdeniz: [], yesilirmak: [], girne: [], lefkosa: [], gecitkale: [], dipkarpaz: [], yenierenkoy: [], alsancak: [], guzelyurt: [] })
  .write()


// Finds
function limasol(sehir) {return sehir.istasyon === 'Limasol';}
function ercan(sehir) {return sehir.istasyon === 'Ercan';}
function larnaka(sehir) {return sehir.istasyon === 'Larnaka';}
function baf(sehir) {return sehir.istasyon === 'Baf';}
function iskele(sehir) {return sehir.istasyon === 'İskele';}
function gazimagusa(sehir) {return sehir.istasyon === 'GaziMağusa';}
function guzelyurt(sehir) {return sehir.istasyon === 'Güzelyurt';}
function lefke(sehir) {return sehir.istasyon === 'Lefke';}
function akdeniz(sehir) {return sehir.istasyon === 'Akdeniz';}
function yesilirmak(sehir) {return sehir.istasyon === 'Yeşilırmak';}
function girne(sehir) {return sehir.istasyon === 'Girne';}
function lefkosa(sehir) {return sehir.istasyon === 'Lefkoşa';}
function gecitkale(sehir) {return sehir.istasyon === 'Geçitkale';}
function dipkarpaz(sehir) {return sehir.istasyon === 'Dipkarpaz';}
function yenierenkoy(sehir) {return sehir.istasyon === 'Yenierenköy';}
function alsancak(sehir) {return sehir.istasyon === 'Alsancak';}


async function main() {
    const result = await request.get("http://kktcmeteor.org/sondurumlar/kktc-geneltablo");
    const $ = cheerio.load(result);
    const scrapedData = [];
    $("#ctl01 > div.container.body-content > div.container > div > div.col-md-9 > table > tbody > tr").each((index, element) => {
        if (index === -1) return true;
        const tds = $(element).find("td");
        const ths = $(element).find("th");
        const isim = String($(ths[0]).text());
        const istasyon = isim;
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

    const iskeledata = scrapedData.find(iskele);
    const limasoldata = scrapedData.find(limasol);
    const ercandata = scrapedData.find(ercan);
    const larnakadata = scrapedData.find(larnaka);
    const bafdata = scrapedData.find(baf);
    const gazimagusadata = scrapedData.find(gazimagusa);
    const guzelyurtdata = scrapedData.find(guzelyurt);
    const lefkedata = scrapedData.find(lefke);
    const akdenizdata = scrapedData.find(akdeniz);
    const yesilirmakdata = scrapedData.find(yesilirmak);
    const girnedata = scrapedData.find(girne);
    const lefkosadata = scrapedData.find(lefkosa);
    const gecitkaledata = scrapedData.find(gecitkale);
    const dipkarpazdata = scrapedData.find(dipkarpaz);
    const yenierenkoydata = scrapedData.find(yenierenkoy);
    const alsancakdata = scrapedData.find(alsancak);
    
    console.log("Veriler Ayrıştırıldı")

if (limasoldata == undefined) { console.log("Limasol Verisi Yüklenemedi")} else {
    db.get('limasol')
    .remove({ id: 1 })
    .write()

    db.get('limasol')
    .push({ id: 1, istasyon: 'limasol', tarih: limasoldata.tarih, hava: limasoldata.hava, sicaklik: limasoldata.sicaklik, nem: limasoldata.nem, basinc: limasoldata.basinc, gorus: limasoldata.gorus, ruzgar: limasoldata.ruzgar})
    .write()
}
if (ercandata == undefined) { console.log("ercan Verisi Yüklenemedi")} else {
    db.get('ercan')
    .remove({ id: 1 })
    .write()

    db.get('ercan')
    .push({ id: 1, istasyon: 'ercan', tarih: ercandata.tarih, hava: ercandata.hava, sicaklik: ercandata.sicaklik, nem: ercandata.nem, basinc: ercandata.basinc, gorus: ercandata.gorus, ruzgar: ercandata.ruzgar})
    .write()
}
if (larnakadata == undefined) { console.log("larnaka Verisi Yüklenemedi")} else {
    db.get('larnaka')
    .remove({ id: 1 })
    .write()

    db.get('larnaka')
    .push({ id: 1, istasyon: 'larnaka', tarih: larnakadata.tarih, hava: larnakadata.hava, sicaklik: larnakadata.sicaklik, nem: larnakadata.nem, basinc: larnakadata.basinc, gorus: larnakadata.gorus, ruzgar: larnakadata.ruzgar})
    .write()
}
if (bafdata == undefined) { console.log("baf Verisi Yüklenemedi")} else {  
    db.get('baf')
    .remove({ id: 1 })
    .write()
    
    db.get('baf')
    .push({ id: 1, istasyon: 'baf', tarih: bafdata.tarih, hava: bafdata.hava, sicaklik: bafdata.sicaklik, nem: bafdata.nem, basinc: bafdata.basinc, gorus: bafdata.gorus, ruzgar: bafdata.ruzgar})
    .write()
}    
if (iskeledata == undefined) { console.log("iskele Verisi Yüklenemedi")} else { 
    db.get('iskele')
    .remove({ id: 1 })
    .write()

    db.get('iskele')
    .push({ id: 1, istasyon: 'iskele', tarih: iskeledata.tarih, hava: iskeledata.hava, sicaklik: iskeledata.sicaklik, nem: iskeledata.nem, basinc: iskeledata.basinc, gorus: iskeledata.gorus, ruzgar: iskeledata.ruzgar})
    .write()
}  
if (gazimagusadata == undefined) { console.log("gazimagusa Verisi Yüklenemedi")} else {  
    db.get('gazimagusa')
    .remove({ id: 1 })
    .write()

    db.get('gazimagusa')
    .push({ id: 1, istasyon: 'gazimagusa', tarih: gazimagusadata.tarih, hava: gazimagusadata.hava, sicaklik: gazimagusadata.sicaklik, nem: gazimagusadata.nem, basinc: gazimagusadata.basinc, gorus: gazimagusadata.gorus, ruzgar: gazimagusadata.ruzgar})
    .write()
}
if (guzelyurtdata == undefined) { console.log("guzelyurt Verisi Yüklenemedi")} else {  
    db.get('guzelyurt')
    .remove({ id: 1 })
    .write()

    db.get('guzelyurt')
    .push({ id: 1, istasyon: 'guzelyurt', tarih: guzelyurtdata.tarih, hava: guzelyurtdata.hava, sicaklik: guzelyurtdata.sicaklik, nem: guzelyurtdata.nem, basinc: guzelyurtdata.basinc, gorus: guzelyurtdata.gorus, ruzgar: guzelyurtdata.ruzgar})
    .write()
}
if (lefkedata == undefined) { console.log("lefke Verisi Yüklenemedi")} else { 
    db.get('lefke')
    .remove({ id: 1 })
    .write()
    
    db.get('lefke')
    .push({ id: 1, istasyon: 'lefke', tarih: lefkedata.tarih, hava: lefkedata.hava, sicaklik: lefkedata.sicaklik, nem: lefkedata.nem, basinc: lefkedata.basinc, gorus: lefkedata.gorus, ruzgar: lefkedata.ruzgar})
    .write()
}
if (akdenizdata == undefined) { console.log("akdeniz Verisi Yüklenemedi")} else {  
    db.get('akdeniz')
    .remove({ id: 1 })
    .write()

    db.get('akdeniz')
    .push({ id: 1, istasyon: 'akdeniz', tarih: akdenizdata.tarih, hava: akdenizdata.hava, sicaklik: akdenizdata.sicaklik, nem: akdenizdata.nem, basinc: akdenizdata.basinc, gorus: akdenizdata.gorus, ruzgar: akdenizdata.ruzgar})
    .write()
}   
if (yesilirmakdata == undefined) { console.log("yesilirmak Verisi Yüklenemedi")} else { 
    db.get('yesilirmak')
    .remove({ id: 1 })
    .write()
    
    db.get('yesilirmak')
    .push({ id: 1, istasyon: 'yesilirmak', tarih: yesilirmakdata.tarih, hava: yesilirmakdata.hava, sicaklik: yesilirmakdata.sicaklik, nem: yesilirmakdata.nem, basinc: yesilirmakdata.basinc, gorus: yesilirmakdata.gorus, ruzgar: yesilirmakdata.ruzgar})
    .write()
}   
if (girnedata == undefined) { console.log("girne Verisi Yüklenemedi")} else {  
    db.get('girne')
    .remove({ id: 1 })
    .write()

    db.get('girne')
    .push({ id: 1, istasyon: 'girne', tarih: girnedata.tarih, hava: girnedata.hava, sicaklik: girnedata.sicaklik, nem: girnedata.nem, basinc: girnedata.basinc, gorus: girnedata.gorus, ruzgar: girnedata.ruzgar})
    .write()
}
if (lefkosadata == undefined) { console.log("lefkosa Verisi Yüklenemedi")} else {  
    db.get('lefkosa')
    .remove({ id: 1 })
    .write()

    db.get('lefkosa')
    .push({ id: 1, istasyon: 'lefkosa', tarih: lefkosadata.tarih, hava: lefkosadata.hava, sicaklik: lefkosadata.sicaklik, nem: lefkosadata.nem, basinc: lefkosadata.basinc, gorus: lefkosadata.gorus, ruzgar: lefkosadata.ruzgar})
    .write()
}
if (gecitkaledata == undefined) { console.log("gecitkale Verisi Yüklenemedi")} else { 
    db.get('gecitkale')
    .remove({ id: 1 })
    .write()
    
    db.get('gecitkale')
    .push({ id: 1, istasyon: 'gecitkale', tarih: gecitkaledata.tarih, hava: gecitkaledata.hava, sicaklik: gecitkaledata.sicaklik, nem: gecitkaledata.nem, basinc: gecitkaledata.basinc, gorus: gecitkaledata.gorus, ruzgar: gecitkaledata.ruzgar})
    .write()
}
if (dipkarpazdata == undefined) { console.log("dipkarpaz Verisi Yüklenemedi")} else {  
    db.get('dipkarpaz')
    .remove({ id: 1 })
    .write()

    db.get('dipkarpaz')
    .push({ id: 1, istasyon: 'dipkarpaz', tarih: dipkarpazdata.tarih, hava: dipkarpazdata.hava, sicaklik: dipkarpazdata.sicaklik, nem: dipkarpazdata.nem, basinc: dipkarpazdata.basinc, gorus: dipkarpazdata.gorus, ruzgar: dipkarpazdata.ruzgar})
    .write()
}
if (yenierenkoydata == undefined) { console.log("yenierenkoy Verisi Yüklenemedi")} else {  
    db.get('yenierenkoy')
    .remove({ id: 1 })
    .write()

    db.get('yenierenkoy')
    .push({ id: 1, istasyon: 'yenierenkoy', tarih: yenierenkoydata.tarih, hava: yenierenkoydata.hava, sicaklik: yenierenkoydata.sicaklik, nem: yenierenkoydata.nem, basinc: yenierenkoydata.basinc, gorus: yenierenkoydata.gorus, ruzgar: yenierenkoydata.ruzgar})
    .write()
}    
if (alsancakdata == undefined) { console.log("alsancak Verisi Yüklenemedi")} else {
    db.get('alsancak')
    .remove({ id: 1 })
    .write()

    db.get('alsancak')
    .push({ id: 1, istasyon: 'alsancak', tarih: alsancakdata.tarih, hava: alsancakdata.hava, sicaklik: alsancakdata.sicaklik, nem: alsancakdata.nem, basinc: alsancakdata.basinc, gorus: alsancakdata.gorus, ruzgar: alsancakdata.ruzgar})
    .write()
}
}


var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 1 minutes check");
  main();
}, the_interval);



app.get('/', function (req, res) {
    
    res.render('index')
  
})

app.get('/app', function (req, res) {
    
    res.send('Şehir Seçiniz')
  
})

app.get('/app/:sehir', (req, res) => {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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
    if ( config.debug == 1) {
        main();
        res.send('Debuging Aktif Veritabanı yenilendi')
    } else {
        res.send('Debuging Aktif Değil')
    }

  
})


app.get('/api', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("/Api Sayfasına Gelen İstek : " + ip)
    res.render('api')
})

app.get('/api/:sehir', (req, res) => {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("/api/" + req.params.sehir + " Adresine istek geldi ip : " + ip)

    const veri = db.get(req.params.sehir)
                .find({ id: 1 })
                .value()
    if ( veri == undefined) {console.log(req.params.sehir  + " Sorgusu atıldı ama veritabanında yok diye sorgu reddedildi"); res.send('Bu şehir henüz veritabanımıza ekli değil'); return false } 
    else {res.json({ guncellenmetarihi: veri.tarih, sehir: veri.istasyon, hava: veri.hava, sicaklik: veri.sicaklik, basinc: veri.basinc, nem: veri.nem, gorus: veri.gorus, ruzgar: veri.ruzgar})}


}) 

app.listen(process.env.PORT || config.port,
	() => console.log("Sunucu Çalışıyor..."));