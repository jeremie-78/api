import createError, { type HttpError } from "http-errors";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";


const notFound = function (req: Request, res: Response, next: NextFunction): void {
	next(createError(404));
}

const errorHandler = function (err: HttpError, req: Request, res: Response): void {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send([res.locals.message, ":", res.locals.error.stack].join(" "));
}

const controllerMap = {
	"/": indexRouter,
	"/users": usersRouter,
	"/games": gamesRouter
}

export default class AppContainer {

	readonly app: Express;

	constructor () {
		this.app = express();

		this.app.use(logger("dev"));
		this.app.use(express.json());
		this.app.use(express.text({ type: "text/*" }));
		this.app.use(express.urlencoded());
		this.app.use(cookieParser());

		for (const [path, router] of Object.entries(controllerMap)) {
			this.app.use(path, router);
		}

		// catch 404 and forward to error handler
		this.app.use(notFound);

		// error handler
		this.app.use(errorHandler);
	}
}