import { type RequestHandler } from "express";
import { injectable } from "tsyringe";
import FirebirdService from "../services/firebird";
import { type MinimalGame, gameColumns } from "../interfaces/game";


@injectable()
export default class GamesController {

	constructor (private firebirdService: FirebirdService) {}

	search: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.searchGames(req.query));
	};

	add: RequestHandler = async (req, res) => {
		const rows = String(req.body).split(/\r?\n/).map(line => line.split(","));
		const headers = rows[0];
		const [titleIndex, consoleIndex] = [headers.indexOf(gameColumns.TITLE), headers.indexOf(gameColumns.CONSOLE)];

		if (titleIndex === -1 || consoleIndex === -1) res.status(400).send("missing header TITLE or CONSOLE");
		if (!headers.every(header => Object.values(gameColumns).includes(header as gameColumns))) res.status(400).send("invalid headers");

		const games = rows.slice(1)
		.filter(row => row.length === headers.length)
		.filter(row => row[titleIndex] !== "" && row[consoleIndex] !== "")
		.map(row => row.reduce((acc, value, index) =>
			({ ...acc, [headers[index]]: value }), {}) as MinimalGame
		);

		res.send(await this.firebirdService.addGames(games));
	};
}