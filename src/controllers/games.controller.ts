import { type RequestHandler } from "express";
import { injectable } from "tsyringe";
import FirebirdService from "../services/firebird.service";


@injectable()
export default class GamesController {

	constructor (private firebirdService: FirebirdService) {}

	all: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.allGames());
	};
}