import express, { type Router } from "express";
import GamesController from "../controllers/games";
import { container } from "tsyringe";


const router: Router = express.Router();

/* GET home page. */
router.get("/", container.resolve(GamesController).test);

export default router;