import express, { Router } from "express";
import { checkPostcode } from "../controllers/checkPostcodes.js";

const router = express.Router();

router.route("/:postcode").get(checkPostcode);
export const postcodeRoutes: Router = router;
