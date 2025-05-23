import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { z } from "zod/v4";

config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
const postcodeIoUrl = "https://api.postcodes.io/postcodes";

const app = express();

app.use(cors());

app.get("/postcode/:postcode", async (req, res) => {
  const { postcode } = req.params;
  const validatedPostcode = z.string().min(5).max(7).safeParse(postcode);

  if (!validatedPostcode.success) {
    res.status(400).send({
      error: `'${postcode}' is in an invalid format. Enter a postcode similar to SW12 4AB`,
    });
  }

  try {
    const response = await fetch(`${postcodeIoUrl}/${postcode}`);
    if (!response.ok) {
      res.status(404).json({ error: "Postcode not found" });
    }
    const data = response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
