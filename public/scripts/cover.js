var key;
var button = document.getElementById('submit').addEventListener("click", buttonClicked);

//export{key};
let query;



function buttonClicked() {
  key = getInputValue();
  query = "{getProfileActiveWorkers (mpn: BTC)}";
  retrieveAccountStatus(query, key);
}


function getInputValue() {
  key = document.getElementById("key").value;
  console.log(key);
  return key;
}


function retrieveAccountStatus(query, key) {

  fetch('https://api.beta.luxor.tech/graphql', {
    method: 'POST',
    headers: {
      'x-lux-api-key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query
    })
  }).then((response) => {
    console.log('resolved', response.status);
    checkHttpStatusCode(response.status);
    return response.json();

  }).then(data => {
    console.log(data.errors);

  })
    .catch((err) => {
      console.log('Invalid API key - The api key send either does not exists or is malformed', err);
      criticalErrorMessage();
    })
}


function checkHttpStatusCode(response) {

  var status = response;

  switch (status) {
    case 200:
      console.log("connected");
      clearMessage();
      openDashboard();
      break;
    case 400:
      console.log("Must provide API Key");
      errorMessage();
      break;
    case 401:
      console.log("Invalid API Key");
      errorMessage();
      break;
    case 500:
      console.log("service connection error");
      criticalErrorMessage();
      break;
    default:
      console.log("HTTP error code: " + status)
      criticalErrorMessage();
      break;
  }
}


function errorMessage() {
  let message = document.getElementById('container');
  message.innerHTML = 'Please provide valid API Key'
}


function clearMessage() {
  let message = document.getElementById('container');
  message.innerHTML = ''
}


function criticalErrorMessage() {
  let message = document.getElementById('container');
  message.innerHTML = 'Service is temporarily down'
}


function openDashboard() {
  let targetUrl = window.open('Dashboard.html');
  targetUrl.onload = self.close();
}