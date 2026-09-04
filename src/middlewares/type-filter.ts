import { type RequestHandler } from "express";


export default function typeFilter (type: string): RequestHandler {
	return (req, res, next) => {
		if (req.headers["content-type"] !== type) res.status(415).header("Accept-Post", type).send();
		next();
	}
}