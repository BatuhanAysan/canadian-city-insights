// Radar chart to display Average Unemployment Rate by City

Papa.parse("Output/unemployment_rates_data.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
  
      const cities = data.map(d => d.City);
      const unemploymentRates = data.map(d => parseFloat(d["Average Unemployment Rate"]));
  
      const trace = {
        type: "scatterpolar",
        r: unemploymentRates,
        theta: cities,
        fill: "toself",
        name: "Unemployment Rate (%)",
        line: {
          color: "#1f77b4",
          width: 3
        },
        marker: {
          size: 6
        }
      };
  
      const layout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, Math.max(...unemploymentRates) + 2],
            tickfont: { size: 12 }
          },
          angularaxis: {
            tickfont: { size: 12 }
          }
        },
        title: {
          text: "Average Unemployment Rate by City",
          font: { size: 20 }
        },
        margin: { t: 60, r: 30, b: 30, l: 30 }
      };
  
      Plotly.newPlot("radarChart", [trace], layout);
    }
  });