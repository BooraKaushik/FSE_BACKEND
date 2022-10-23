import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema(
  {
    tuit: { type: String, required: true },
    postedOn: { type: Date, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "Tuits" }
);
export default TuitSchema;
