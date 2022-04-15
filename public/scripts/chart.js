setInterval(documentOnload, 60000);
setInterval(addTime,60000)
setInterval(chartUpdate,10000);

let TH = 1000000000000;
let hashArray = [];
let time = [];
let minutes = 0;

var chart = document.getElementById('chart').getContext('2d'),

gradient = chart.createLinearGradient(0, 0, 0, 450);
gradient.addColorStop(0, 'rgba(121, 0, 243, 1)');
gradient.addColorStop(0.5, 'rgba(121, 0, 243,.75)');
gradient.addColorStop(1, 'rgba(121, 0, 243, .1)');

var data = {
	labels: time,
	datasets: [{
		backgroundColor: gradient,
		pointBackgroundColor: 'black',
		borderWidth: 2,
		borderColor: 'rgba(225, 29, 243, .1)',
		data: hashArray
	}]
};

var options = {
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
	},
	scales: {
		xAxes: [{
			gridLines: {
				color: 'rgba(0, 0, 0, 0.5)',
				lineWidth: 1
			}
		}],
		yAxes: [{
			gridLines: {
				color: 'rgba(0, 0, 0, 0.5)',
				lineWidth: 1
			}
		}]
	},
	elements: {
		line: {
			tension: 0.4
		}
	},
	legend: {
		display: false
	},
	point: {
		backgroundColor: 'white'
	},
	tooltips: {
		titleFontFamily: 'Open Sans',
		backgroundColor: 'rgba(0,0,0,0.3)',
		titleFontColor: 'White',
		caretSize: 5,
		cornerRadius: 2,
		xPadding: 10,
		yPadding: 10
	}
};

	var chartInstance = new Chart(chart, {
		type: 'line',
		data: data,
		options: options
	});

function retrieveChartData() {

	fetch('https://api.beta.luxor.tech/graphql', {
		method: 'POST',
		headers: {
			'x-lux-api-key': 'lxk.4521f61805b5c91d46ce2be89b36d134',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: "{getProfileHashrate (mpn: BTC)}"
		})
	}).then((response) => {
		return response.json();

	}).then(data => {
		hashRateArray(data.data.getProfileHashrate);
		return data.data.getProfileHashrate
	})
		.catch((err) => {
			console.log(err);
		})
}

function chartUpdate(){
	chartInstance.update();
}

function documentOnload() {
	let data = retrieveChartData()
}

function hashRateArray(hashRate) {
	hashRateArrayLimitSize();
	hashArray.push(Math.round(hashRate/TH));
}

function hashRateArrayLimitSize() {
	if (hashArray.length > 20) {
		hashArray.shift();
	}
}

function addTime(){
	timeArrayLimitSize();
	time.push(minutes + ' Minutes');
	minutes += 1;
}

function timeArrayLimitSize() {
	if (time.length > 20) {
		time.shift();
	}
}