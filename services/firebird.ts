import Firebird from "node-firebird";
import dotenv from "dotenv";
import { singleton } from "tsyringe";


dotenv.config();

@singleton()
export default class FirebirdService {

	constructor () {}

	test (): void {
		Firebird.attach({ database: "games", user: process.env.FIREBIRD_USER, password: process.env.FIREBIRD_PASSWORD }, (err, db) => {
			if (err) throw err;
			db.query("SELECT * FROM TEST", [], function (err, result) {
				if (err) throw err;
				console.log(result);
			});
		});
	}
}