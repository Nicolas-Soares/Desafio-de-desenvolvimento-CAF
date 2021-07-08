import express from "express";
import { getRealTimeCompanyData } from "./services/realTimeService";
import { getCachedCompanyData } from "./services/cachedService";

const routes = express.Router();

routes.get("/real-time", getRealTimeCompanyData);
routes.get("/cached", getCachedCompanyData);

export { routes };
