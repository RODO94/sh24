import express, { Express } from "express";
import cors from "cors";
import { postcodeRoutes } from "./routes/postcode.js";

export const postcodeIoUrl = "https://api.postcodes.io/postcodes";

export const app: Express = express();

app.use(cors());
app.use("/postcode", postcodeRoutes);
