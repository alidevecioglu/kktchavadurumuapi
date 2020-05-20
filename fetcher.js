var config = require('./config');

const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require('axios');

const istasyonlar = ["limasol", "ercan", "larnaka", "baf", "iskele", "gazimagusa", "guzelyurt", "lefke", "akdeniz", "yesilirmak", "girne", "lefkosa", "gecitkale", "dipkarpaz", "yenierenkoy", "alsancak"];
const dburl = config.dburl
const dbkey = config.dbkey

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

    // Limasol Post

    const limasolist = scrapedData.find(limasol)
    if (limasolist == "undefined") {console.log("Limasol Verisi Bulunamadı")} 
    else {
            console.log("Limasol Verisi Güncelleniyor")
            axios.post(dburl, { key: dbkey, istasyon: limasolist.istasyon, tarih: limasolist.tarih, hava: limasolist.hava, sicaklik: limasolist.sicaklik, nem: limasolist.nem, basinc: limasolist.basinc, gorus: limasolist.gorus, ruzgar: limasolist.ruzgar })
              .then((res) => { console.log("Gönderildi") })
              .catch((error) => { console.error(error) })
        }


    // Ercan Post

    const ercanist = scrapedData.find(ercan)
    if (ercanist == "undefined") {console.log("Ercan Verisi Bulunamadı")} 
    else {
            console.log("Ercan Verisi Güncelleniyor")
            axios.post(dburl, { key: dbkey, istasyon: ercanist.istasyon, tarih: ercanist.tarih, hava: ercanist.hava, sicaklik: ercanist.sicaklik, nem: ercanist.nem, basinc: ercanist.basinc, gorus: ercanist.gorus, ruzgar: ercanist.ruzgar })
                .then((res) => { console.log("Gönderildi") })
                .catch((error) => { console.error(error) })
        }

    // Larnaka Post

    const larnakaist = scrapedData.find(larnaka)
    if (larnakaist == "undefined") {console.log("Larnaka Verisi Bulunamadı")} 
    else {
        console.log("Larnaka Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: larnakaist.istasyon, tarih: larnakaist.tarih, hava: larnakaist.hava, sicaklik: larnakaist.sicaklik, nem: larnakaist.nem, basinc: larnakaist.basinc, gorus: larnakaist.gorus, ruzgar: larnakaist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

}
main();






// #ctl01 > div.container.body-content > div.container > div > div.col-md-9 > table > tbody > tr:nth-child(1)