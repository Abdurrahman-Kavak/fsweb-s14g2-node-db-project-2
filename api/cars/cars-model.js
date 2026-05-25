const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where("id", id).first();
};

const create = (car) => {
  // HOKUS POKUS
  return db("cars").insert(car);
};

module.exports = {
  getAll,
  getById,
  create,
};
