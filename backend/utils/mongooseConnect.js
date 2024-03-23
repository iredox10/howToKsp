import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    await mongoose.connect("mongodb://localhost/howksp");
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectMongoose