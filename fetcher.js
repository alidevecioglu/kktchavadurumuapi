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


    // baf Post

    const bafist = scrapedData.find(baf)
    if (bafist == "undefined") {console.log("baf Verisi Bulunamadı")} 
    else {
        console.log("baf Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: bafist.istasyon, tarih: bafist.tarih, hava: bafist.hava, sicaklik: bafist.sicaklik, nem: bafist.nem, basinc: bafist.basinc, gorus: bafist.gorus, ruzgar: bafist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // iskele Post

    const iskeleist = scrapedData.find(iskele)
    if (iskeleist == "undefined") {console.log("iskele Verisi Bulunamadı")} 
    else {
        console.log("iskele Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: iskeleist.istasyon, tarih: iskeleist.tarih, hava: iskeleist.hava, sicaklik: iskeleist.sicaklik, nem: iskeleist.nem, basinc: iskeleist.basinc, gorus: iskeleist.gorus, ruzgar: iskeleist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }


    // gazimagusa Post

    const gazimagusaist = scrapedData.find(gazimagusa)
    if (gazimagusaist == "undefined") {console.log("gazimagusa Verisi Bulunamadı")} 
    else {
        console.log("gazimagusa Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: gazimagusaist.istasyon, tarih: gazimagusaist.tarih, hava: gazimagusaist.hava, sicaklik: gazimagusaist.sicaklik, nem: gazimagusaist.nem, basinc: gazimagusaist.basinc, gorus: gazimagusaist.gorus, ruzgar: gazimagusaist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // guzelyurt Post

    const guzelyurtist = scrapedData.find(guzelyurt)
    if (guzelyurtist == "undefined") {console.log("guzelyurt Verisi Bulunamadı")} 
    else {
        console.log("guzelyurt Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: guzelyurtist.istasyon, tarih: guzelyurtist.tarih, hava: guzelyurtist.hava, sicaklik: guzelyurtist.sicaklik, nem: guzelyurtist.nem, basinc: guzelyurtist.basinc, gorus: guzelyurtist.gorus, ruzgar: guzelyurtist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // lefke Post

    const lefkeist = scrapedData.find(lefke)
    if (lefkeist == "undefined") {console.log("lefke Verisi Bulunamadı")} 
    else {
        console.log("lefke Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: lefkeist.istasyon, tarih: lefkeist.tarih, hava: lefkeist.hava, sicaklik: lefkeist.sicaklik, nem: lefkeist.nem, basinc: lefkeist.basinc, gorus: lefkeist.gorus, ruzgar: lefkeist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // akdeniz Post

    const akdenizist = scrapedData.find(akdeniz)
    if (akdenizist == "undefined") {console.log("akdeniz Verisi Bulunamadı")} 
    else {
        console.log("akdeniz Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: akdenizist.istasyon, tarih: akdenizist.tarih, hava: akdenizist.hava, sicaklik: akdenizist.sicaklik, nem: akdenizist.nem, basinc: akdenizist.basinc, gorus: akdenizist.gorus, ruzgar: akdenizist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // yesilirmak Post

    const yesilirmakist = scrapedData.find(yesilirmak)
    if (yesilirmakist == "undefined") {console.log("yesilirmak Verisi Bulunamadı")} 
    else {
        console.log("yesilirmak Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: yesilirmakist.istasyon, tarih: yesilirmakist.tarih, hava: yesilirmakist.hava, sicaklik: yesilirmakist.sicaklik, nem: yesilirmakist.nem, basinc: yesilirmakist.basinc, gorus: yesilirmakist.gorus, ruzgar: yesilirmakist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // girne Post

    const girneist = scrapedData.find(girne)
    if (girneist == "undefined") {console.log("girne Verisi Bulunamadı")} 
    else {
        console.log("girne Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: girneist.istasyon, tarih: girneist.tarih, hava: girneist.hava, sicaklik: girneist.sicaklik, nem: girneist.nem, basinc: girneist.basinc, gorus: girneist.gorus, ruzgar: girneist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // lefkosa Post

    const lefkosaist = scrapedData.find(lefkosa)
    if (lefkosaist == "undefined") {console.log("lefkosa Verisi Bulunamadı")} 
    else {
        console.log("lefkosa Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: lefkosaist.istasyon, tarih: lefkosaist.tarih, hava: lefkosaist.hava, sicaklik: lefkosaist.sicaklik, nem: lefkosaist.nem, basinc: lefkosaist.basinc, gorus: lefkosaist.gorus, ruzgar: lefkosaist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // gecitkale Post

    const gecitkaleist = scrapedData.find(gecitkale)
    if (gecitkaleist == "undefined") {console.log("gecitkale Verisi Bulunamadı")} 
    else {
        console.log("gecitkale Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: gecitkaleist.istasyon, tarih: gecitkaleist.tarih, hava: gecitkaleist.hava, sicaklik: gecitkaleist.sicaklik, nem: gecitkaleist.nem, basinc: gecitkaleist.basinc, gorus: gecitkaleist.gorus, ruzgar: gecitkaleist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // dipkarpaz Post

    const dipkarpazist = scrapedData.find(dipkarpaz)
    if (dipkarpazist == "undefined") {console.log("dipkarpaz Verisi Bulunamadı")} 
    else {
        console.log("dipkarpaz Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: dipkarpazist.istasyon, tarih: dipkarpazist.tarih, hava: dipkarpazist.hava, sicaklik: dipkarpazist.sicaklik, nem: dipkarpazist.nem, basinc: dipkarpazist.basinc, gorus: dipkarpazist.gorus, ruzgar: dipkarpazist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // yenierenkoy Post

    const yenierenkoyist = scrapedData.find(yenierenkoy)
    if (yenierenkoyist == "undefined") {console.log("yenierenkoy Verisi Bulunamadı")} 
    else {
        console.log("yenierenkoy Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: yenierenkoyist.istasyon, tarih: yenierenkoyist.tarih, hava: yenierenkoyist.hava, sicaklik: yenierenkoyist.sicaklik, nem: yenierenkoyist.nem, basinc: yenierenkoyist.basinc, gorus: yenierenkoyist.gorus, ruzgar: yenierenkoyist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

    // alsancak Post

    const alsancakist = scrapedData.find(alsancak)
    if (alsancakist == "undefined") {console.log("alsancak Verisi Bulunamadı")} 
    else {
        console.log("alsancak Verisi Güncelleniyor")
        axios.post(dburl, { key: dbkey, istasyon: alsancakist.istasyon, tarih: alsancakist.tarih, hava: alsancakist.hava, sicaklik: alsancakist.sicaklik, nem: alsancakist.nem, basinc: alsancakist.basinc, gorus: alsancakist.gorus, ruzgar: alsancakist.ruzgar })
            .then((res) => { console.log("Gönderildi") })
            .catch((error) => { console.error(error) })
        }

}
main();






// #ctl01 > div.container.body-content > div.container > div > div.col-md-9 > table > tbody > tr:nth-child(1)