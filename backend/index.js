require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 5000;

const app = express();

const path = require("path");

const routes = require("./routes/routes.js");

const mongoose = require("mongoose");

const bodyparser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: false,
  useUnifiedTopology: false,
});

app.use("", routes);

app.listen(port);
