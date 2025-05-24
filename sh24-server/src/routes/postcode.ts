import express, { Router } from "express";
import { checkPostcode } from "../controllers/postcode.js";

const router = express.Router();

router.route("/:postcode").get(checkPostcode);
export const postcodeRoutes: Router = router;
