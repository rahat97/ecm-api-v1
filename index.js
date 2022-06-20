const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");

require("dotenv").config();
const PORT = process.env.PORT || 5001;

// app init
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/template"));
// app.use('/api/user', seedRouter);

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jmnaf.mongodb.net/pos-api-v1?retryWrites=true&w=majority`;
// database connection
mongoose
  .connect(dbUrl)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application router
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

// Home
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/template/home.html"));
});

// error Handle
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
}

// start app
app.listen(PORT, () => {
  console.log("Listing port:", PORT);
});
