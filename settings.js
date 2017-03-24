const LocalStorage = require('node-localstorage').LocalStorage;
lstorage = new LocalStorage("./settings");

exports.lstorage = lstorage;
