const axios = require("axios");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "mahmud.db.elephantsql.com",
    user: "etsolubq",
    password: "Revd3y4iSPDcSClNOIdRQLnxaDpTh4SL",
    database: "etsolubq",
    port: 5432,
  },
});

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

module.exports = { knex, api };
