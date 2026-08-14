import express, { type Router } from "express";
import { container } from "tsyringe";
import GamesController from "../controllers/games.controller";


const router: Router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {res.send("Welcome to Express")});

export default router;