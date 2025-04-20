// Bubble Chart to display selected Amenity per City

let bubbleChart;

Papa.parse("../../Output/dashboard_data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    bubbleData = results.data;
    updateBubbleChart();
  }
});

function updateBubbleChart() {
  if (!bubbleData) return;

  let x = bubbleData.map(d => d.City);
  let y = [];

  if (selectedAmenityType === "hospitals") {
    y = bubbleData.map(d => parseFloat(d.hospitals_per_100k));
  } else if (selectedAmenityType === "universities") {
    y = bubbleData.map(d => parseFloat(d.schools_per_100k));
  } else if (selectedAmenityType === "supermarkets") {
    y = bubbleData.map(d => parseFloat(d.groceries_per_100k));
  } else {
    y = bubbleData.map(d => parseFloat(d.hospitals_per_100k));
  }

  const size = y.map(val => Math.sqrt(val) * 1000); // Adjust size scaling as needed

  let colorscale = "Reds";
  if (selectedAmenityType === "hospitals") {
    colorscale = "Reds";
  } else if (selectedAmenityType === "universities") {
    colorscale = "Blues";
  } else if (selectedAmenityType === "supermarkets") {
    colorscale = "YlOrBr";
  }

  const trace = {
    x: x,
    y: y,
    text: x,
    mode: "markers",
    marker: {
      size: size,
      sizemode: "area",
      color: y,
      colorscale: colorscale,
      showscale: false,
      opacity: 0.7,
      line: { width: 2, color: "white" }
    }
  };

  const layout = {
    title: "Amenities per 100k Population",
    xaxis: { title: "City" },
    yaxis: { title: "Amenities per 100k" },
    height: 500
  };

  Plotly.newPlot("bubbleChart", [trace], layout);
}

// Expose to global
window.updateBubbleChart = updateBubbleChart;

