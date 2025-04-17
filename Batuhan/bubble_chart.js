// Bubble chart component using Plotly

let selectedAmenity = "hospitals_per_100k"; // default
let selectedCity = null; // updated from map marker clicks

function drawBubbleChart(data) {
  const cities = data.map(d => d.City);
  const values = data.map(d => parseFloat(d[selectedAmenity]));
  const populations = data.map(d => parseInt(d["Population(2021)"]));

  // Define color scale based on selected amenity
  let colorscale;
  if (selectedAmenity === "hospitals_per_100k") {
    colorscale = [[0, '#c6dbef'], [1, '#08306b']]; // blue gradient
  } else if (selectedAmenity === "schools_per_100k") {
    colorscale = [[0, '#fdd0a2'], [1, '#7f2704']]; // orange gradient
  } else if (selectedAmenity === "groceries_per_100k") {
    colorscale = [[0, '#c7e9c0'], [1, '#00441b']]; // green gradient
  }

  const trace = {
    x: cities,
    y: values,
    text: cities,
    mode: "markers",
    marker: {
      size: populations.map(p => Math.sqrt(p)),
      sizemode: "area",
      sizeref: 2.0 * Math.max(...populations.map(p => Math.sqrt(p))) / (120**2),
      color: values,
      colorscale: colorscale,
      showscale: true,
      opacity: 0.85,
      line: { width: 1, color: "#333" }
    },
    type: "scatter"
  };

  const layout = {
    title: `Bubble Chart - ${selectedAmenity.replace('_per_100k','').toUpperCase()} per 100k`,
    xaxis: { title: "City" },
    yaxis: { title: `${selectedAmenity.replace('_per_100k','')} per 100,000 people` },
    margin: { t: 60, r: 30, b: 80, l: 60 }
  };

  Plotly.newPlot("bubbleChart", [trace], layout);
}

// Load CSV and draw chart
Papa.parse("Output/dashboard_data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    window.cityData = results.data;
    drawBubbleChart(window.cityData);
  }
});

// Dropdown change handler
function onAmenityChange(value) {
  selectedAmenity = value;
  drawBubbleChart(window.cityData);
}

// City selection from map (called externally)
function selectCity(cityName) {
  selectedCity = cityName;
  const cityOnly = window.cityData.filter(d => d.City === cityName);
  drawBubbleChart(cityOnly);
} 

// Optional: Expose onAmenityChange to global scope
window.onAmenityChange = onAmenityChange;
window.selectCity = selectCity;

