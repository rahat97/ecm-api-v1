const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const employeeRouter = require("./routes/employeeRouter");
const bankRouter = require("./routes/bankRouter");
const attendanceRouter = require("./routes/attendanceRouter");
const clientRouter = require("./routes/clientsRouter");
const inventoryRouter = require("./routes/inventoryRouter");
const projectRouter = require("./routes/projectRouter");
const requisitionRouter = require("./routes/requisitionRouter");
const supplierRouter = require("./routes/supplierRouter");
const userRouter = require("./routes/userRouters");
const accountRouter = require("./routes/accountRouter");
const unitRouter = require("./routes/unitRouter");

const multer = require("multer");

require("dotenv").config();
const PORT = process.env.PORT || 5001;

// app init
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());
app.use(express.static(__dirname + "/template"));

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ht6vrw8.mongodb.net/?retryWrites=true&w=majority`;
// database connection
mongoose
  .connect(dbUrl)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application router

app.use("/api/employee", employeeRouter);
app.use("/api/bank", bankRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/client", clientRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/project", projectRouter);
app.use("/api/requisition", requisitionRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/unit", unitRouter);

// Home
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/template/home.html"));
});

// // API DOCS
// app.get("/docs", async (req, res) => {
//   res.sendFile(path.join(__dirname + "/template/docs.html"));
// });

// error Handle
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  } else {
    if (err instanceof multer.MulterError) {
      res.status(500).send(err.message);
    } else {
      res.status(500).json({ err: err });
    }
  }
};

app.use(errorHandler);

// start app
app.listen(PORT, () => {
  console.log("Listing port:", PORT);
});
