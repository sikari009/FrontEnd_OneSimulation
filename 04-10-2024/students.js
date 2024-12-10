document.addEventListener('DOMContentLoaded', function () {
  showingStudentsGraphs();
});

const configBp_chart = {
  type: 'line',
  data: {
      labels: Array(50).fill(''), // Time or Data Points
      datasets: [
          {
              label: 'Blood Pressure',
              data: Array(50).fill(0),
              borderColor: 'red',
              borderWidth: 2,
              lineTension: 0.25,
              pointRadius: 0,
              fill: false,
          },
      ],
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: { display: false },
      },
      animation: {
          duration: 300,
          easing: 'linear',
      },
      scales: {
          y: {
              min: 0,
              max: 150,
          },
      },
      tooltips: { display: false },
  },
};
const configSpo2_chart = {
  type: 'line',
  data: {
      labels: Array(50).fill(''), // Time or Data Points
      datasets: [
          {
              label: 'Blood Pressure',
              data: Array(50).fill(0),
              borderColor: 'red',
              borderWidth: 2,
              lineTension: 0.25,
              pointRadius: 0,
              fill: false,
          },
      ],
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: { display: false },
      },
      animation: {
          duration: 300,
          easing: 'linear',
      },
      scales: {
          y: {
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

// Define other charts config similar to BP config (spo2, pulse, etc.)

let bpChart = null;
let spo2Chart = null;
let pulseChart = null;
let isSpo2GraphRunning = false; // Flag to control the graph updating
// let spo2ChartUpdateInterval;


const pulseEventSource = new EventSource('http://localhost:4000/student-Pulse-data');

pulseEventSource.onmessage = (event) => {
  const data = JSON.parse(event.data); // Parse incoming JSON data
  console.log('Received PULSE data:', data);
  
  if (data.pulsevalue !== undefined) {
    updateStudentPulseChart(data.pulsevalue); // Update the chart with received pulse data
  } else {
    console.warn('Pulse value is undefined in received data');
  }
};




const spo2EventSource = new EventSource('http://localhost:4000/student-spo2-data');
spo2EventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.spo2value !== undefined) {
      updateStudentSpo2Chart(data.spo2value);
  }
  }


 
const eventSource = new EventSource('http://localhost:4000/transferData');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data); // Parse the JSON data
  // Update BP chart when BP data is received
  if (data.bpvalue !== undefined) {
      updateBpChart(data.bpvalue);
  }
  // Update other charts conditionally when data for them is received
};

eventSource.onerror = (error) => {
  console.error('Error in EventSource:', error);
};

// Create the BP chart after DOM is loaded
function initializeCharts() {
  const bpCtx = document.getElementById('bp_chart')?.getContext('2d');
  const spo2Ctx = document.getElementById('spo2Graph')?.getContext('2d');
  const pulseCtx = document.getElementById('pulseGraph')?.getContext('2d');
  if (bpCtx) {
      bpChart = new Chart(bpCtx, configBp_chart);
  }
  if (spo2Ctx) {
    spo2Chart = new Chart(spo2Ctx, configSpo2_chart);
  }
  if (pulseCtx) {
    pulseChart = new Chart(pulseCtx, configPulse_chart);
}
  // Initialize other charts similarly
}

// Update BP chart data
function updateBpChart(bpValue) {
  if (isBpGraphUpdating) {
      document.getElementById('bpvalue').innerText = `${bpValue}`;

      // Push new data point and remove the oldest if more than 50
      bpChart.data.labels.push(''); // Add new time label
      bpChart.data.datasets[0].data.push(bpValue); // Add new BP value

      if (bpChart.data.labels.length > 50) {
          bpChart.data.labels.shift();
          bpChart.data.datasets[0].data.shift();
      }

      bpChart.update();
  }
}

function updateStudentSpo2Chart(spo2value) {
  if (spo2Chart) {
    document.getElementById('spo2Value').innerText = `${spo2value}`;

    // document.getElementById('spo2value').innerText = `${spo2value}`;
    spo2Chart.data.labels.push('');
    spo2Chart.data.datasets[0].data.push(spo2value);

    if (spo2Chart.data.labels.length > 50) {
      spo2Chart.data.labels.shift();
      spo2Chart.data.datasets[0].data.shift();
    }

    spo2Chart.update();
  }
}
function updateStudentPulseChart(pulsevalue) {
  if (pulseChart) {
    console.log("PULSE VALUE AT CHART", pulsevalue)
    document.getElementById('pulseValue').innerText = `${pulsevalue}`;

    // document.getElementById('spo2value').innerText = `${spo2value}`;
    pulseChart.data.labels.push('');
    pulseChart.data.datasets[0].data.push(pulsevalue);

    if (pulseChart.data.labels.length > 50) {
      pulseChart.data.labels.shift();
      pulseChart.data.datasets[0].data.shift();
    }

    pulseChart.update();
  }
}
  let isBpGraphUpdating = false;
  let isSpo2GraphUpdating = false;
  let isPulseGraphUpdating = false;

  function checkBpCommand() {
    fetch('http://localhost:4000/status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received BP command data:', data); // Log the data for debugging
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
        // console.log('Received BP command data:', data); // Log the data for debugging
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
          resetPulseChart(); // Reset chart if stop command is received
        }
      })
      .catch(error => {
        console.error('Error fetching Pulse command:', error);
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
    document.getElementById('spo2Value').innerText = 0;  // Interval of 100ms for smooth removal
  }
  function resetPulseChart() {
    pulseChart.data.datasets[0].data = Array(50).fill(0);  // Reset BP chart
    pulseChart.update();
    document.getElementById('pulseValue').innerText = 0;  // Interval of 100ms for smooth removal
  }
  
// Function to show all charts on page load
function showingStudentsGraphs() {
  initializeCharts();
  setInterval(checkBpCommand, 2000);
  setInterval(checkSpo2Command, 2000);
  setInterval(checkPulseCommand, 2000);
}
