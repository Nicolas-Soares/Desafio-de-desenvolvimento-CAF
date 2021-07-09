import mongoose from "mongoose";

export function connectToDatabase() {
  mongoose.connect(`${process.env.MONGO_DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to database!");
  });
}