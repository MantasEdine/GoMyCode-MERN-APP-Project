const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const Cat = require("./routes/category");
// App set up
const app = express();
app.use(cors());
// Configuration setting
app.use(express.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  app.use(morgan("dev"));
  next();
});
//APIs E-P
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/category", Cat);
// dotenv configuration
const port = process.env.PORT || 3001;
const db_url = process.env.DB_URL;

// Listening on port and connecting to the database
mongoose
  .connect(
    "mongodb+srv://YoucefRabia:IAcjRN0F48NFERkI@cluster0.abwtzgw.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log("App listening on port " + port);
    });
  })
  .catch((err) => console.error(err));

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
