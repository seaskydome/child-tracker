import "dotenv/config";
import express from "express";

const app = express();

// server endpoint
// get request, get data from the server i guess.
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


export default app;