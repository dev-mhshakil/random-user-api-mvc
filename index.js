const express = require("express");
const app = express();

const usersRoutes = require("./routes/users.routes");

app.use(express.json());

app.use("/", usersRoutes);

const port = 5000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
