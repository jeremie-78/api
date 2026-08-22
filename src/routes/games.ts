import express, { type Router } from "express";
import { container } from "tsyringe";
import GamesController from "../controllers/games";


const router: Router = express.Router();
const gamesController = container.resolve(GamesController);

router.get("/", gamesController.all);

export default router;