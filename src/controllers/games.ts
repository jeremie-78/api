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
		const rows = String(req.body).split("\n").map(line => line.split(","));
		const headers = rows[0];
		const [titleIndex, consoleIndex] = [headers.indexOf("TITLE"), headers.indexOf("CONSOLE")];

		if (titleIndex === -1 || consoleIndex === -1) res.status(400).send("missing header TITLE or CONSOLE");

		const indexMappings = Object.entries(headers).reduce

		const values = rows.slice(1).filter(row => row.length === headers.length).filter(row => row[titleIndex] !== "" && row[consoleIndex] !== "");

		res.send(await this.firebirdService.addGames(req.body));
	};
}