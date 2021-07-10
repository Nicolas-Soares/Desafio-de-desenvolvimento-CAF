import express from "express";
import { getRealTimeCompanyData } from "./controllers/realTimeController";
import { getCachedCompanyData } from "./controllers/cachedController";

const routes = express.Router();

routes.get("/real-time", getRealTimeCompanyData);
routes.get("/cached", getCachedCompanyData);

export { routes };
