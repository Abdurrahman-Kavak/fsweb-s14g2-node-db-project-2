const express = require("express");
const carsRouter = require("./cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);

// SİHRİNİZİ GÖSTERİN

module.exports = server;
