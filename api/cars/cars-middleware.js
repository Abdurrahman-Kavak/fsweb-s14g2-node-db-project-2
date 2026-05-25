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
    res.status(400).json({ message: `${vin} adı eksik` });
  } else if (!make) {
    res.status(400).json({ message: `${make} adı eksik` });
  } else if (!model) {
    res.status(400).json({ message: `${model} adı eksik` });
  } else if (!mileage) {
    res.status(400).json({ message: `${mileage} adı eksik` });
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
    res.status(400).json({ message: `vin ${req.body.vin} geçersizdir` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const existingCar = await db("cars").where("vin", req.body.vin).first();
    if (existingCar) {
      res.status(400).json({ message: `vin ${req.body.vin} zaten var` });
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
