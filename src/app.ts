require("dotenv").config();

import express from "express";
import { routes } from "./routes";
import { connectToDatabase } from "./database/mongodb";

const app = express();

connectToDatabase()

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333, () => console.log("Server running"));
