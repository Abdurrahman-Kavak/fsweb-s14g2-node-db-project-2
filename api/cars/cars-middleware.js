const db = require("../../data/db-config");
const cars = require("./cars-model");
var vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  // HOKUS POKUS
  const { id } = req.params;
  cars.getById(id).then((car) => {
    if (car) {
      req.car = car;
      next();
    } else {
      res
        .status(404)
        .json({ message: `${id} kimliğine sahip araba bulunamadı` });
    }
  });
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  var isVinValid = vinValidator.validate(req.body.vin);
  if (isVinValid) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const existingCar = await db("cars").where("vin", req.body.vin).first();
    if (existingCar) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
