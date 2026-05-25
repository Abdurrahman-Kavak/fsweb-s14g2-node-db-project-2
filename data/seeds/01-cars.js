// ESNEK
/**
 *@param {import ("knex").Knex} knex
 *@returns {Promise<void>}
 */

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert([
    {
      vin: "02A215",
      make: "Toyota",
      model: "Corolla",
      mileage: 12,
      title: "temiz",
      transmission: "manuel",
    },
  ]);
};
