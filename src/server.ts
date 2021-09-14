import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import SerialPort from "serialport";
import { Data } from "./interfaces/data.dto";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const config = {
	port: Number(process.env.PORT) || 3000,
	hostName: process.env.HOST || "localhost",
};

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname, "/public/index.html"));

server.listen(config.port, () => {
	console.log(`Server running on port ${config.hostName}:${config.port}`);
});

const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine({ delimiter: "\r\n" });
const serial = new SerialPort("/dev/ttyACM0", {
	baudRate: 9600,
});

serial.pipe(parser);

serial.on("open", () => {
	console.log("Connect Starting");
	parser.on("data", (data) => {
		const results = String(data).split(",");
		const dataResult: Data = {
			celsius: Number(results[1]),
			humidity: Number(results[0]),
			fahrenheit: Number(results[2]),
		};
		console.log(dataResult);

		io.emit("serial:data", {
			dataResult,
		});
	});
});

io.sockets.on("connection", (socket) => {
	console.log(`New client is connect: ${socket.id}`);
	socket.on("btnAction", (data) => {
		const { value } = data;
		serial.write(value);
	});
});
