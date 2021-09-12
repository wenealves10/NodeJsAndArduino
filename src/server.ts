import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const config = {
	port: Number(process.env.PORT) || 3000,
	hostName: process.env.HOST || "localhost",
};

app.use(express.json());

app.get("/", (req, res) => res.send("Hello Arduino"));

app.listen(config.port, () => {
	console.log(`Server running on port ${config.hostName}:${config.port}`);
});
