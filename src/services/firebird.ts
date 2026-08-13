import * as Firebird from "node-firebird";
import { type ConnectionPool } from "node-firebird";
import { singleton } from "tsyringe";


@singleton()
export default class FirebirdService {

	readonly pool: ConnectionPool;

	constructor () {
		this.pool = Firebird.pool(5, { database: "db_1" });
	}

	test () {
		return this.pool.withConnection(db => db.queryAsync("SELECT * FROM GAMES", []));
	}
}