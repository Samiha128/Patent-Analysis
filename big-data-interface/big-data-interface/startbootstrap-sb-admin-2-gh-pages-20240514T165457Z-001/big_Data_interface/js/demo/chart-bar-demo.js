// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Generate labels for years from 1870 to 2024
var labels = [];
for (var year = 1870; year <= 2024; year++) {
  labels.push(year.toString());
}

// Example countries data for illustration
var countries = ["United States", "China", "India", "Germany", "Brazil", "France", "Russia", "United Kingdom", "Japan", "Canada"];
var data = [];

// Function to generate random percentages that sum to 1
function getRandomPercentages(count) {
  var randomValues = [];
  var total = 0;
  for (var i = 0; i < count; i++) {
    var rand = Math.random();
    randomValues.push(rand);
    total += rand;
  }
  // Normalize so the sum is 1
  return randomValues.map(value => value / total);
}

// Generate data for each year with a total of 100000 patents
for (var i = 0; i < labels.length; i++) {
  var percentages = getRandomPercentages(countries.length);
  var values = percentages.map(percentage => Math.round(percentage * 100000));
  data.push(values);
}

// Convert the data to the format required by Chart.js
var datasets = [];
for (var i = 0; i < countries.length; i++) {
  var dataset = {
    label: countries[i],
    backgroundColor: getRandomColor(),
    hoverBackgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
    data: data.map(yearData => yearData[i]),
  };
  datasets.push(dataset);
}

// Function to generate random colors for the bars
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: datasets
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'year'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 10
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          // Dynamically set max to 100000
          max: 100000,
          maxTicksLimit: 5,
          padding: 10,
          // Do not include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: true
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
});
