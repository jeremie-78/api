import express, { type Router } from "express";
import { container } from "tsyringe";
import GamesController from "../controllers/games";


const router: Router = express.Router();

/* GET home page. */
router.get("/", container.resolve(GamesController).test);

export default router;