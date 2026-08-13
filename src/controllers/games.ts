import { type RequestHandler } from "express";
import FirebirdService from "../services/firebird";
import { injectable } from "tsyringe";


@injectable()
export default class GamesController {

	constructor (private firebirdService: FirebirdService) {}

	test: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.test());
	};
}