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
		const rows = String(req.body).split(/\r?\n/).map(line =>
			line.split(/(?<=^[^"]*(?:"[^"]*"[^"]*)*),/) // splits on commas that are not inside quotes (= preceded by an even number of quotes)
		);
		const headers = rows[0];
		const [titleIndex, consoleIndex] = [headers.indexOf(gameColumns.TITLE), headers.indexOf(gameColumns.CONSOLE)];

		if (titleIndex === -1 || consoleIndex === -1)
			res.status(400).send("missing header TITLE or CONSOLE");
		if (!headers.every(header => Object.values(gameColumns).includes(header as gameColumns)))
			res.status(400).send("invalid headers");

		const games: MinimalGame[] = rows.slice(1)
		.map(row => row.map(value =>
			value === "" ? undefined : JSON.parse(value)
		))
		.filter(row => row.length === headers.length)
		.filter(row => row[titleIndex]?.length && row[consoleIndex]?.length)
		.map(row => row.reduce((acc, value, index) => (
			value !== "" ? { ...acc, [headers[index]]: value } : acc
		), {}) as MinimalGame);

		if (games.length < rows.length - 1) res.status(400).send("one or more invalid rows");

		res.send(await this.firebirdService.addGames(games));
	};

	del: RequestHandler = async (req, res) => {
		res.send(await this.firebirdService.deleteGame(req.body));
	}
}