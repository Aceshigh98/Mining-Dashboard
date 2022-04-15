//import{ key } from '../scripts/cover'

setInterval(getBitcoinPrice,2000);
setInterval(updateDocument, 2000);
setInterval(setDocument,5000);


let queryBtcRevenue = "{getProfile24HRevenue(mpn: BTC)}";
let queryActiveMiners = '{getProfileActiveWorkers (mpn: BTC)}';
let queryInactiveMiners = '{getProfileInactiveWorkers (mpn: BTC)}';
let queryHashRate = '{getProfileHashrate (mpn: BTC)}';
let Hash = 1000000000000;

const btcPriceDoc = document.getElementById('btcPrice');
const btcRevenueDoc = document.getElementById('btcRevenue');
const btcRevenueUsdDoc = document.getElementById('btcRevenueUsd');
const networkDifDoc = document.getElementById('networkDif');
const activeMinersDoc = document.getElementById('activeMiners');
const inactiveMinersDoc = document.getElementById('inactiveMiners');
const hashRateDoc = document.getElementById('hashrate');

var bitcoinPrice;
var dailyRevenueBTC;
var dailyRevenueUSD;
var networkDifficulty;
var activeMiners;
var inactiveMiners;
var currentHashrate;


function updateDocument() {
	getDashboardInfo(queryBtcRevenue);
	getDashboardInfo(queryActiveMiners);
	getDashboardInfo(queryInactiveMiners);
	getDashboardInfo(queryHashRate);
	getRevenueUSD();
}

function setDocument() {
	btcRevenueDoc.innerHTML = "24 Hour Revenue (BTC): " + dailyRevenueBTC.toFixed(5);
	btcRevenueUsdDoc.innerHTML = "24 Hour Revenue (USD): $" + dailyRevenueUSD.toFixed(2);
	activeMinersDoc.innerHTML = "Active Miners: " + activeMiners;
	inactiveMinersDoc.innerHTML = "Inactive Miners: " + inactiveMiners;
	hashRateDoc.innerHTML = "Current Hashrate: TH/s" + currentHashrate;
	btcPriceDoc.innerHTML = "Bitcoin Price: $"+bitcoinPrice; 
}

function getDashboardInfo(query) {
	//console.log("Query: " + JSON.stringify({ query }));
	fetch('https://api.beta.luxor.tech/graphql', {
		method: 'POST',
		headers: {
			'x-lux-api-key': 'lxk.4521f61805b5c91d46ce2be89b36d134',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: query
		})
	}).then((response) => response.json())
		.then((data) => {
			returnData(data, query);
			return data;
		})
		.catch((err) => {
			console.log(err);
		})
}

function returnData(data, query) {
	if (query == queryBtcRevenue) {
		dailyRevenueBTC = data.data.getProfile24HRevenue;
	} else if (query == queryActiveMiners) {
		activeMiners = data.data.getProfileActiveWorkers;
	} else if (query == queryInactiveMiners) {
		inactiveMiners = data.data.getProfileInactiveWorkers;
	} else if (query == queryHashRate) {
		currentHashrate = Math.round(data.data.getProfileHashrate/Hash);
	}
}

function getBitcoinPrice() {
	fetch('https://www.bitstamp.net/api/ticker/', {
		method: 'GET',
 		/* mode: 'no-cors', */
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(response => {
		console.log(response.status);
		return response.json();
	 } )
	.then((data) => {console.log(data.last);
		bitcoinPrice = data.last; 
	}
	).catch((err) => {
			console.log(err);
		})
}


function getRevenueUSD(){
	dailyRevenueUSD = dailyRevenueBTC*bitcoinPrice;
}

