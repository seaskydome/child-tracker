import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

// this is basically like defining an interface or yup validation
// for the .env file
// basically it takes the env, makes sure that it has the required stuff,
// and returns a validated env
export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
})