import * as Firebird from "node-firebird";
import { type ConnectionPool } from "node-firebird";
import { singleton } from "tsyringe";
import { type GameTemplate, type MinimalGame } from "../interfaces/game";


@singleton()
export default class FirebirdService {

	readonly pool: ConnectionPool;

	constructor () {
		this.pool = Firebird.pool(5, { database: process.env.DB });
	}

	searchGames (game: GameTemplate) {
		const clauses = Object.entries(game).map(([key, value]): [string, string] => {switch (key) {
			case "TITLE":
				return ["TITLE LIKE", `%${value.trim().toLowerCase().split(" ").join("_%")}%`];
			case "CONSOLE":
				return ["CONSOLE =", value.toUpperCase()];
			case "REGION":
				return ["REGION =", value];
			case "LANGUAGE":
				return ["LANGUAGE =", value];
			case "EDITION":
				return ["EDITION =", value];
			case "COMPLETE":
				return ["COMPLETE =", value];
			case "CASE_TYPE":
				return ["CASE_TYPE =", value];
			default:
				return ["", ""];
		}});

		return this.pool.withConnection(db => db.queryAsync(
			`SELECT * FROM GAMES${clauses.length > 0 ? " WHERE " : ""}${clauses.map(clause => `${clause[0]} ?`).join(" AND ")}`,
			[...clauses.map(clause => clause[1])]
		));
	}

	addGames (games: MinimalGame[]) {
		return this.pool.withConnection(db => db.executeBatchAsync(
			`INSERT INTO GAMES (${Object.keys(games[0]).join(", ")}) VALUES (${Array(Object.entries(games[0]).length).fill("?").join(", ")})`,
			games.map(game => Object.values(game))
		));
	}
}