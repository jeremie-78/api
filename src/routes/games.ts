import express, { type Router } from "express";
import { container } from "tsyringe";
import GamesController from "../controllers/games";
import typeFilter from "../middlewares/type-filter";


const router: Router = express.Router();
const gamesController = container.resolve(GamesController);

router.get("/", gamesController.search);

router.post("/", typeFilter("text/csv"), gamesController.add);

export default router;