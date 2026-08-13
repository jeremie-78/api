#!/usr/bin/env tsx
import "reflect-metadata";
import { createServer, type Server } from "node:http";
import { container } from "tsyringe";
import dotenv from "dotenv";
import AppContainer from "./express";
import { type Express } from "express";


dotenv.config();

const app: Express = container.resolve(AppContainer).app;

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server: Server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val: string): string | number | boolean {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error: any): void {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string"
		? "Pipe " + port
		: "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening (): void {
	const addr = server.address();
	const bind = typeof addr === "string"
		? "pipe " + addr
		: "port " + addr?.port;
	console.debug("Listening on " + bind);
}