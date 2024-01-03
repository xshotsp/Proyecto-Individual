const { Router } = require("express");

const GET = require("./GET_videogames");
const GET_BY_ID = require("./GET_videogames_{id}");
const POST = require("./POST_videogames");
const DELETE = require("./DELETE_videogames");

const videoGamesRouter = Router();

videoGamesRouter.use("/", GET);
videoGamesRouter.use("/", GET_BY_ID);
videoGamesRouter.use("/", POST);
videoGamesRouter.use("/", DELETE);

module.exports = videoGamesRouter;
