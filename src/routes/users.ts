import express, { type Router } from "express";


const router: Router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
	res.send("respond with a resource");
});

export default router;