import mongoose from "mongoose";

export default function () {
  mongoose.connect(process.env.MONGO_URI || "");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("database is connected succusefully");
  });
}
