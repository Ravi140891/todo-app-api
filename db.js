const Knex = require("knex");
const { Model } = require("objection");
const joi = require("joi");
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const knex = Knex({
  client: "postgresql",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
});

Model.knex(knex);

module.exports = {
  knex,
  joi,
};
