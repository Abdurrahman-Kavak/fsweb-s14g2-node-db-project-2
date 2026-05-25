exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("vin").notNullable().unique();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.integer("mileage").notNullable();
    table.string("title");
    table.string("transmission");
  });
};

exports.down = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  knex.schema.dropTableIfExists("cars");
};
