const express = require("express");
const cors = require("cors");
const routes = require("./controller/authRoutes");
const cookieParser = require("cookie-parser");

const { requireAuth, checkUser } = require("./middleware/middleware");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

//middlewere
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

//routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/welcome", requireAuth, (req, res) => res.render("welcome"));
app.use(routes);

// connection to mongobd

const mongoose = require("mongoose"); //B49n3LKVOjcSBhQ1

const db_url =
  "mongodb+srv://Afifa:B49n3LKVOjcSBhQ1@todoapp.tiaogll.mongodb.net/?retryWrites=true&w=majority";
async function connectDb() {
  try {
    await mongoose.connect(db_url);
    console.log("Connection successful");
  } catch (err) {
    console.log(err);
  }
}
const port = process.env.PORT || 8080;

app.listen(port, async () => {
  await connectDb();
  console.log(`Server listening on port : ${port} `);
});
