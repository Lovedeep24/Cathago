const express = require("express");

const app = express();
app.use(express.json());
const DB_FILE = "database.json";
