import { InferSchemaType, Schema, model } from "mongoose";


// create a schema for the users
// select: false means that whenever we request a user, this data
// will not be returned automatically; it must be explicitly requested
// unique: true is pretty self explanatory, you cant insert files
// with the same value for the field
const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true, select: false},
  password: { type: String, required: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);