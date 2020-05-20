const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/db', function (req, res) {
    res.send('POST request to the DB')
  })

app.get('/api', (req, res) => {
    res.json({ guncellenmetarihi: "20.05.2020 09:00", sehir: "TEST", hava: "HAVA AÇIK", sicaklik: "37.3°C", isbasicaklik: "10.6°C", basinc: "1010.3 hPa", gorus: "10KM", ruzgar: "Kuzeydoğudan (30) 12 kt."})
}) 

app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));