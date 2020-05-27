var config = {};

// DB Ayarları

config.dbtime = 1; // Kaç Dakikada sonra veri tabanı güncellensin ?


// Web Ayarları

config.debug = 0;
config.port = 3000; // Heroku üzerinde çalıştırmak için 3000. portu kullanmanız gerekmektedir.


module.exports = config;