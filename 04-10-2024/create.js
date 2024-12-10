document.addEventListener('DOMContentLoaded', function () {
  setupMonitoringButton();
});

var disease_cond = 'normal';
let bpvalue = 120;
let spo2value = 100;
let pulsevalue = 100;
let cvpvalue = 5;
let papvalue = 23;
let etco2value = 40;
let rrvalue = 16;
let minbpvalue = 90;
let minspo2value = 95;
let minpulsevalue = 60;
let mincvpvalue = 2;
let minpapvalue = 15;
let minetco2value = 35;
let minrrvalue = 12;

const beepSound = new Audio('04-10-2024\beep.mp3');

function playBeep() {
  beepSound.play();
}

  
function setupMonitoringButton(){
  document.getElementById('teachers-section')?.addEventListener('click', () => {
    window.location.href = 'login.html';
});

document.getElementById('students-section')?.addEventListener('click', () => {
    window.location.href = 'students.html';
});

document.getElementById('back')?.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = "index.html"; // Redirect to the index.html page
});
}
// document.getElementById('start-monitoring')?.addEventListener('click',startMonitoring)

// Create variable which holds Y-axis and X-axis values (min, max for graph)
const configBp_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Blood Pressure',
        data: Array(50).fill(0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 2,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'red',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 150,
      },
    },
    tooltips: { display: false },
  },
};

const configSpo2_chart = {
  // Define the config for SPO2 chart similarly to BP chart
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'blue',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 150,
      },
    },
    tooltips: { display: false },
  },
};

const configPulse_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'blue',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 150,
      },
    },
    tooltips: { display: false },
  },
};

const configEcg_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'blue',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 150,
      },
    },
    tooltips: { display: false },
  },
};

const configCvp_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'orange',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 12,
      },
    },
    tooltips: { display: false },
  },
};

const configPap_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'orange',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 50,
      },
    },
    tooltips: { display: false },
  },
};

const configEtco2_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'aqua',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows dynamic resizing
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 60,
      },
    },
    tooltips: { display: false },
  },
};

const configRr_chart = {
  type: 'line',
  data: {
    labels: Array(50).fill(''), // Time or Data Points
    datasets: [
      {
        label: 'Spo2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 1,
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0,
        borderColor: 'aqua',
        fill: false,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 300, // Faster animation
      easing: 'linear', // Smooth easing function
    },
    scales: {
      y: {
        title: {
          display: false,
          text: '',
        },
        min: 0,
        max: 30,
      },
    },
    tooltips: { display: false },
  },
};

// Select all canvas elements within the .graphs container
const canvasElements = document.querySelectorAll("canvas");

// Create separate chart instances for BP and SPO2 charts
const bpChart = new Chart(document.getElementById("bp_chart").getContext("2d"), configBp_chart);
const spo2Chart = new Chart(document.getElementById("spo2_chart").getContext("2d"), configSpo2_chart);
const pulseChart = new Chart(document.getElementById("pulse_chart").getContext("2d"), configPulse_chart);
const ecgChart = new Chart(document.getElementById("ecg_chart").getContext('2d'), configEcg_chart);
const cvpChart = new Chart(document.getElementById("cvp_chart").getContext("2d"), configCvp_chart);
const papChart = new Chart(document.getElementById("pap_chart").getContext("2d"), configPap_chart);
const etco2Chart = new Chart(document.getElementById("etco2_chart").getContext("2d"), configEtco2_chart);
const rrChart = new Chart(document.getElementById("rr_chart").getContext("2d"), configRr_chart);

// Function to generate random BP values between 12 and 20
function generateDiseaseCondValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const diseaseConditionDropdown = document.getElementById('diseaseCondition');
console.log("dhgvhsgvkhs" ,diseaseConditionDropdown);
function onConditionChange() {
  const diseaseCondition = diseaseConditionDropdown.value;
  console.log("condition", diseaseCondition)
  if(diseaseCondition == 'hypertension'){
    bpvalue = 140;
    spo2value = 100;
    minbpvalue = 90;
    minspo2value = 95;
  }
  console.log("bpvalue",bpvalue);
  console.log("bpvalue",spo2value);
  console.log("bpvalue",minbpvalue);
  console.log("bpvalue",minspo2value);
}
diseaseConditionDropdown.addEventListener('change', onConditionChange);

function printbpHighInputValue(event) {
  // Store the new value from the input field
  bpvalue = Number(event.target.value);
  document.getElementById('bpHighinputvalue').value = "";
  console.log(bpvalue)
}
function printbpLowInputValue(event){
  minbpvalue = Number(event.target.value);
  document.getElementById('bpLowinputvalue').value = "";
  console.log(minbpvalue)
}
function printspo2HighInputValue(event) {
  // Store the new value from the input field
  spo2value = Number(event.target.value);  
  document.getElementById('spo2Highinputvalue').value = "";
}
function printspo2LowInputValue(event){
  minspo2value = Number(event.target.value);
  document.getElementById('spo2Lowinputvalue').value = "";
}
function printpulseHighInputValue(event) {
  // Store the new value from the input field
  pulsevalue =Number(event.target.value);
  document.getElementById('pulseHighinputvalue').value = "";
}
function printpulseLowInputValue(event) {
  // Store the new value from the input field
  minpulsevalue = Number(event.target.value);
  document.getElementById('pulseLowinputvalue').value = "";
}
function printcvpHighInputValue(event) {
  // Store the new value from the input field
  cvpvalue = Number(event.target.value);  
  document.getElementById('cvpHighinputvalue').value = "";
}
function printcvpLowInputValue(event) {
  // Store the new value from the input field
  mincvpvalue = Number(event.target.value);
  document.getElementById('cvpLowinputvalue').value = "";  
}
function printpapHighInputValue(event) {
  // Store the new value from the input field
  papvalue = Number(event.target.value);
  document.getElementById('papHighinputvalue').value = "";
}
function printpapLowInputValue(event) {
  // Store the new value from the input field
  minpapvalue = Number(event.target.value);
  document.getElementById('papLowinputvalue').value = "";
}
function printetco2HighInputValue(event) {
  // Store the new value from the input field
  etco2value = Number(event.target.value);
  document.getElementById('etco2Highinputvalue').value = "";
}
function printetco2LowInputValue(event) {
  // Store the new value from the input field
  minetco2value = Number(event.target.value);
  document.getElementById('etco2lowinputvalue').value = "";
}
function printrrHighInputValue(event) {
  // Store the new value from the input field
  rrvalue = Number(event.target.value);
  document.getElementById('rrHighinputvalue').value = ""; 
}
function printrrLowInputValue(event) {
  // Store the new value from the input field
  minrrvalue = Number(event.target.value);
  document.getElementById('rrLowinputvalue').value = ""; 
}


let isBpGraphUpdating = false;
let isSpo2GraphUpdating = false;
let isPulseGraphUpdating = false;
let isCvpGraphUpdating = false;
let isEtco2GraphUpdating = false;
let isRrGraphUpdating = false;


function startBpGraph() {
  if (isBpGraphUpdating) {
    let bpValue = generateDiseaseCondValue(minbpvalue, bpvalue); // Generate BP value
    bpChart.data.datasets[0].data.push(bpValue);
    if (bpChart.data.datasets[0].data.length > 50) {
      bpChart.data.datasets[0].data.shift(); // Keep the dataset at 50 items
    }
    bpChart.update(); // Update the chart
    document.getElementById('bpvalue').innerText = bpValue;
    const simulatedData = {
      bpvalue: bpValue
    };
    fetch('http://localhost:4000/teacher-graph-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => console.log('Data successfully sent to server', result))
      .catch(error => console.error('Error sending data:', error));
  
    console.log("Simulated data:", simulatedData); // Update BP value display
  }

}

function startSpo2Graph() {
  if (isSpo2GraphUpdating) {
    let spo2Value = generateDiseaseCondValue(minspo2value, spo2value); // Generate BP value
    spo2Chart.data.datasets[0].data.push(spo2Value);
    if (spo2Chart.data.datasets[0].data.length > 50) {
      spo2Chart.data.datasets[0].data.shift(); // Keep the dataset at 50 items
    }
    spo2Chart.update(); // Update the chart
    document.getElementById('spo2value').innerText = spo2Value; 

    const simulatedData = {
      spo2value: spo2Value
    };
    
    fetch('http://localhost:4000/teacher-Spo2-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => console.log('Data successfully sent to server', result))
      .catch(error => console.error('Error sending data:', error));
  
    console.log("Simulated data:", simulatedData);// Update BP value display
  }
}

function startPulseGraph() {
  if (isPulseGraphUpdating) {
    let pulseValue = generateDiseaseCondValue(minpulsevalue, pulsevalue); // Generate BP value
    pulseChart.data.datasets[0].data.push(pulseValue);
    if (pulseChart.data.datasets[0].data.length > 50) {
      pulseChart.data.datasets[0].data.shift(); // Keep the dataset at 50 items
    }
    pulseChart.update(); // Update the chart
    document.getElementById('pulsevalue').innerText = pulseValue; 

    const simulatedData = {
      pulsevalue: pulseValue
    };
    
    fetch('http://localhost:4000/teacher-Pulse-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedData),
    })
      .then(response => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => console.log('Data successfully sent to server', result))
      .catch(error => console.error('Error sending data:', error));
  
    console.log("Simulated data:", simulatedData);// Update BP value display
  }
}

// Polling function to check if we should start or stop the graph
function checkBpCommand() {
  fetch('http://localhost:4000/status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // console.log('Received BP command data:', data); // Log the data for debugging
      if (data.bpCommand === 'START') {
        isBpGraphUpdating = true;
      } else if (data.bpCommand === 'STOP') {
        isBpGraphUpdating = false;
        resetBpChart(); // Reset chart if stop command is received
      }
    })
    .catch(error => {
      console.error('Error fetching BP command:', error);
    });
}

function checkSpo2Command() {
  fetch('http://localhost:4000/status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received BP command data:', data); // Log the data for debugging
      if (data.spo2Command === 'START') {
        isSpo2GraphUpdating = true;
      } else if (data.spo2Command === 'STOP') {
        isSpo2GraphUpdating = false;
        resetSpo2Chart(); // Reset chart if stop command is received
      }
    })
    .catch(error => {
      console.error('Error fetching BP command:', error);
    });
}

function checkPulseCommand() {
  fetch('http://localhost:4000/status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received BP command data:', data); // Log the data for debugging
      if (data.pulseCommand === 'START') {
        isPulseGraphUpdating = true;
      } else if (data.pulseCommand === 'STOP') {
        isPulseGraphUpdating = false;
        resetSpo2Chart(); // Reset chart if stop command is received
      }
    })
    .catch(error => {
      console.error('Error fetching BP command:', error);
    });
}
function resetBpChart() {
  bpChart.data.datasets[0].data = Array(50).fill(0);  // Reset BP chart
  bpChart.update();
  document.getElementById('bpvalue').innerText = 0;  // Interval of 100ms for smooth removal
}

function resetSpo2Chart() {
  spo2Chart.data.datasets[0].data = Array(50).fill(0);  // Reset BP chart
  spo2Chart.update();
  document.getElementById('spo2value').innerText = 0;  // Interval of 100ms for smooth removal
}
function resetPulseChart() {
  pulseChart.data.datasets[0].data = Array(50).fill(0);  // Reset BP chart
  pulseChart.update();
  document.getElementById('pulsevalue').innerText = 0;  // Interval of 100ms for smooth removal
}
// Set intervals to call functions
setInterval(startBpGraph, 600); // Start BP graph update every second
setInterval(checkBpCommand, 2000);
setInterval(startSpo2Graph, 600); // Start BP graph update every second
setInterval(checkSpo2Command, 2000);
setInterval(startPulseGraph, 600)
setInterval(checkPulseCommand, 2000);

































































































































/*
// let isBpStopped = false;
let isBpStart =  false;
let isSpo2Stopped = false;
let isPulseStopped = false;
let isMonitoring = false;

// Start monitoring function

function checkForAllStopCommands() {
  checkBpStopCommand();
  checkSpo2StopCommand();
  checkPulseStopCommand();
}

/*
function checkForAllStopCommands() {
  fetch('http://localhost:4000/arduino-data-bp')
    .then(response => response.json())
    .then(data => {
      console.log('BP Response:', data); // Debugging
      if (data.command === 'STOP') {
        isBpStopped = true;
        resetBpChartsToZero();
        setTimeout(() => { isBpStopped = false; }, 10000);
      }
    })
    .catch(error => console.error('Error in BP stop:', error));

  fetch('http://localhost:4000/arduino-data-spo2')
    .then(response => response.json())
    .then(data => {
      console.log('SpO2 Response:', data); // Debugging
      if (data.command === 'STOP-SPO2') {
        isSpo2Stopped = true;
        resetSpo2ChartsToZero();
        setTimeout(() => { isSpo2Stopped = false; }, 10000);
      }
    })
    .catch(error => console.error('Error in SpO2 stop:', error));

  fetch('http://localhost:4000/arduino-data-pulse')
    .then(response => response.json())
    .then(data => {
      console.log('Pulse Response:', data); // Debugging
      if (data.command === 'STOP-PULSE') {
        isPulseStopped = true;
        resetPulseChartsToZero();
        setTimeout(() => { isPulseStopped = false; }, 10000);
      }
    })
    .catch(error => console.error('Error in Pulse stop:', error));
}

*/



// Separate functions to check each command with debugging
/*
function checkBpStopCommand() {
  fetch('http://localhost:4000/arduino-data-bp')
    .then(response => response.json())
    .then(data => {
      console.log('BP Data:', data); // Debugging
      if (data.command === 'START') {
        isBpStart = true;
      }elseif(data.command === 'STOP'){
        isBpStart = false;
      }
    })
    .catch(error => console.error('Error checking BP stop command:', error));
}

function checkSpo2StopCommand() {
  fetch('http://localhost:4000/arduino-data-spo2')
    .then(response => response.json())
    .then(data => {
      console.log('SpO2 Data:', data); // Debugging
      if (data.command === 'STOP') {
        isSpo2Stopped = true;
        resetSpo2ChartsToZero();
        setTimeout(() => {
          isSpo2Stopped = false;
        }, 10000);
      }
    })
    .catch(error => console.error('Error checking SpO2 stop command:', error));
}

function checkPulseStopCommand() {
  fetch('http://localhost:4000/arduino-data-pulse')
    .then(response => response.json())
    .then(data => {
      console.log('Pulse Data:', data); // Debugging
      if (data.command === 'STOP') {
        isPulseStopped = true;
        resetPulseChartsToZero();
        setTimeout(() => {
          isPulseStopped = false;
        }, 10000);
      }
    })
    .catch(error => console.error('Error checking Pulse stop command:', error));
}
// Reset chart values to zero




// Check the server for stop command
// function checkForStopCommand2() {
//   fetch('http://localhost:4000/arduino-data-spo2')
//     .then(response => response.json())
//     .then(data => {
//       if (data.command === 'STOP-SPO2') {
//         isSpo2Stopped = true;
//         resetSpo2ChartsToZero();
//         setTimeout(() => {
//           isSpo2Stopped = false; // Resume normal updates after 10 seconds
//         }, 10000);
//       }
//     })
//     .catch(error => console.error('Error checking for stop command:', error));
// }


// function checkForStopCommand3() {
//   fetch('http://localhost:4000/arduino-data-pulse')
//     .then(response => response.json())
//     .then(data => {
//       if (data.command === 'STOP-PULSE') {
//         isPulseStopped = true;
//         resetPulseChartsToZero();
//         setTimeout(() => {
//           isPulseStopped = false; // Resume normal updates after 10 seconds
//         }, 10000);
//       }
//     })
//     .catch(error => console.error('Error checking for stop command:', error));
// }

// Reset chart values to zero

function resetBpChartsToZero() {
  if (!isBpStart) {
    bpChart.data.datasets[0].data = Array(50).fill(0);  // Reset BP chart
    bpChart.update();
    document.getElementById('bpvalue').innerText = 0;   // Reset BP display value
  }
}
// Reset chart values to zero
function resetSpo2ChartsToZero() {
  if (isSpo2Stopped) {
    spo2Chart.data.datasets[0].data = Array(50).fill(0);  // Reset SpO2 chart
    spo2Chart.update();
    document.getElementById('spo2value').innerText = 0;   // Reset SpO2 display value
  }
}

function resetPulseChartsToZero() {
  if (isPulseStopped) {
    pulseChart.data.datasets[0].data = Array(50).fill(0);  // Reset Pulse chart
    pulseChart.update();
    document.getElementById('pulsevalue').innerText = 0;   // Reset Pulse display value
  }
}



// Function to update charts based on the disease condition
function updateChart() {
  if (!isBpStart) return; // Skip updating if stopped

  let bpValue = generateDiseaseCondValue(minbpvalue, bpvalue);
  let spo2Value = generateDiseaseCondValue(minspo2value, spo2value);
  let pulseValue = generateDiseaseCondValue(minpulsevalue, pulsevalue);
  let cvpValue = generateDiseaseCondValue(mincvpvalue, cvpvalue);
  let papValue = generateDiseaseCondValue(minpapvalue, papvalue);
  let etco2Value = generateDiseaseCondValue(minetco2value, etco2value);
  let rrValue = generateDiseaseCondValue(minrrvalue, rrvalue);

  // Only update BP chart if not stopped
  if (!isBpStart) {
    bpChart.data.datasets[0].data.push(bpValue);
    if (bpChart.data.datasets[0].data.length > 50) bpChart.data.datasets[0].data.shift();
    bpChart.update();
    document.getElementById('bpvalue').innerText = bpValue; // Update BP display
  }

  // Only update SpO2 chart if not stopped
  if (!isSpo2Stopped) {
    spo2Chart.data.datasets[0].data.push(spo2Value);
    if (spo2Chart.data.datasets[0].data.length > 50) spo2Chart.data.datasets[0].data.shift();
    spo2Chart.update();
    document.getElementById('spo2value').innerText = spo2Value; // Update SpO2 display
  }

  // Only update Pulse chart if not stopped
  if (!isPulseStopped) {
    pulseChart.data.datasets[0].data.push(pulseValue);
    if (pulseChart.data.datasets[0].data.length > 50) pulseChart.data.datasets[0].data.shift();
    pulseChart.update();
    document.getElementById('pulsevalue').innerText = pulseValue; // Update Pulse display
  }

  // Update other charts as usual
  cvpChart.data.datasets[0].data.push(cvpValue);
  papChart.data.datasets[0].data.push(papValue);
  etco2Chart.data.datasets[0].data.push(etco2Value);
  rrChart.data.datasets[0].data.push(rrValue);

  // Trim data to keep only 50 values
  if (cvpChart.data.datasets[0].data.length > 50) cvpChart.data.datasets[0].data.shift();
  if (papChart.data.datasets[0].data.length > 50) papChart.data.datasets[0].data.shift();
  if (etco2Chart.data.datasets[0].data.length > 50) etco2Chart.data.datasets[0].data.shift();
  if (rrChart.data.datasets[0].data.length > 50) rrChart.data.datasets[0].data.shift();

  cvpChart.update();
  papChart.update();
  etco2Chart.update();
  rrChart.update();

  // Update display values on the page
  document.getElementById('cvpvalue').innerText = cvpValue;
  document.getElementById('papvalue').innerText = papValue;
  document.getElementById('etco2value').innerText = etco2Value;
  document.getElementById('rrvalue').innerText = rrValue;

  // Play beep only if at least one chart is actively updating
  if (!isBpStart || !isSpo2Stopped || !isPulseStopped) {
    playBeep();
  }

  const simulatedData = {
    bpvalue: bpValue,
    spo2value: spo2Value,
    pulsevalue: pulseValue,
    cvpvalue: cvpValue,
    papvalue: papValue,
    etco2value: etco2Value,
    rrvalue: rrValue,
  };

  fetch('http://localhost:4000/teacher-graph-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(simulatedData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => console.log('Data successfully sent to server', result))
    .catch(error => console.error('Error sending data:', error));

  console.log("Simulated data:", simulatedData);
}

function startMonitoring() {
  // isMonitoring = true;
  updateChart();
  setInterval(updateChart, 1500);
}






// Run checkForStopCommand functions and updateChart every 1.5 seconds if not stopped
setInterval(checkForAllStopCommands, 2000);
// setInterval(checkForStopCommand2, 2000);
// setInterval(checkForStopCommand3, 2000);
setInterval(updateChart, 600); // Adjusted interval for chart updates
*/