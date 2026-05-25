const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = () => {
  // HOKUS POKUS
  return db("cars").where("id", id).first();
};

const create = () => {
  // HOKUS POKUS
  return db("cars").insert(car);
};
