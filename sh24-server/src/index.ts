import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { postcodeRoutes } from "./routes/postcode.js";

config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
export const postcodeIoUrl = "https://api.postcodes.io/postcodes";

const app = express();

app.use(cors());
app.use("/postcode", postcodeRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
