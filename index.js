const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const Parser = require("body-parser").urlencoded({ extended: false });
const model = require('./model/routes');


app.set("host", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static("public"));
app.use(Parser);
app.use(morgan('dev'));
app.use(model);

app.listen(app.get("host"), (req, res) => {
    console.log("Servidor en puerto: " , app.get("host"));
});