const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./app/routes/taskRoutes"); 
const userRoutes = require("./app/routes/userRoutes");
const {protect} = require('./app/middleware/authMiddleware')
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(" Connected to MongoDB");
  })
  .catch((err) => {
    console.log(" Cannot connect to MongoDB", err);
    process.exit();
  });

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to my app" });
  });

app.use("/api/users", userRoutes);
app.use("/api/tasks", protect,  taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on PORT ${PORT}`);
});
