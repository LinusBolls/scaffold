import { model, Schema } from "mongoose";

const userProperties = {
  name: String,
  email: String,
  password: String,
};
const schemaOptions = {
  strict: false,
  timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
};
const userSchema = new Schema(userProperties, schemaOptions);

const User = model("User", userSchema);

export default User;
export { userProperties, userSchema };
