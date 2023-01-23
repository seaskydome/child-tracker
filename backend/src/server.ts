import express from "express";

const app = express();
const port = 5000;

// get request, get data from the server i guess. 
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// calls when the server starts on the port
app.listen(port, () => {
  console.log("Server running on port: " + port)
})