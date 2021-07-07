import express from "express";
import { getCompanyData } from "./services/realTimeService";

const routes = express.Router();

routes.get("/real-time", getCompanyData);

export { routes };
