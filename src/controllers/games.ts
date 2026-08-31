import { type RequestHandler } from "express";
import { injectable } from "tsyringe";
import FirebirdService from "../services/firebird";


@injectable()
export default class GamesController {

	constructor (private firebirdService: FirebirdService) {}

	search: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.searchGames(req.query));
	};

	add: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.addGame(req.body));
	};
}