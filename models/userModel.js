import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: [
        "Female",
        "Male",
        "Agender",
        "Bigender",
        "Polygender",
        "Non-binary",
        "Genderfluid",
        "Genderqueer",
      ],
    },
    avatar: {
      type: String,
      required: false,
    },
    domain: {
      type: String,
      required: false,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;