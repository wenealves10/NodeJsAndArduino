/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const socketIo = io();
let counter = 2;

const ctx = document.getElementById("myGraphicCelsius").getContext("2d");
const myGraphic = new Chart(ctx, {
	type: "line",
	data: {
		labels: ["°C"],
		datasets: [
			{
				label: "Celsius",
				data: [],
				fill: true,
				backgroundColor: ["rgb(247, 242, 111, 0.2)"],
				borderColor: ["red"],
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

const ctxh = document.getElementById("myGraphicHumidity").getContext("2d");
const myGraphich = new Chart(ctxh, {
	type: "line",
	data: {
		labels: ["%"],
		datasets: [
			{
				label: "Humidity",
				data: [],
				fill: true,
				backgroundColor: ["rgb(104, 204, 202, 0.2)"],
				borderColor: ["blue"],
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

socketIo.on("serial:data", (dataSerial) => {
	myGraphic.data.labels.push(counter);
	myGraphic.data.datasets.forEach((element) => {
		element.data.push(dataSerial.dataResult.celsius);
	});
	myGraphich.data.labels.push(counter);
	myGraphich.data.datasets.forEach((element) => {
		element.data.push(dataSerial.dataResult.humidity);
	});
	counter += 2;
	myGraphic.update();
	myGraphich.update();
});

const btnHigh = document.getElementById("high");
const btnLow = document.getElementById("low");
btnHigh.addEventListener('click', function() {
  const call = io();
  const {value} = this
  call.emit("btnAction", {
    value,
  })
  console.log(value)
});

btnLow.addEventListener('click', function() {
  const call = io();
  const {value} = this
  call.emit("btnAction", {
    value,
  })
  console.log(value)
})
