// this file contains the data model
import { InferSchemaType, model, Schema } from "mongoose";

// create a schema for the children
const childSchema = new Schema({
  // each child must be associated with a user
  userId: { type: Schema.Types.ObjectId, required: true},
  
  name: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
}, { timestamps: true });

// creating type for type safety in other stuff later on
// created automatically with mongoose function. COOL!
type Child = InferSchemaType<typeof childSchema>;

export default model<Child>("Child", childSchema);