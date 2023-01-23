// this file contains starting up the server
import app from "./app";
// because it is the default export we can give it any name
import env from "./util/validateEnv"
import mongoose from "mongoose";

const port = env.PORT;

// connecting to the database with mongoose
mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Mongoose Connected");
  // calls when the server starts on the port
  app.listen(port, () => {
    console.log("Server running on port: " + port);
  });
  // .catch executes if the .then errors
}).catch(console.error);

