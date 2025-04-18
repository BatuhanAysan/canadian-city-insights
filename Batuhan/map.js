// Initialize the Leaflet map centered on Canada
const map = L.map('map').setView([54, -100], 4);

// Add custom tile layer for better appearance
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

// Layer for amenities
const amenityLayerGroup = L.layerGroup().addTo(map);

// Load CSV and store globally
let allCityData = [];
let selectedCity = null;
let selectedAmenityType = "all";

Papa.parse("Output/dashboard_data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    allCityData = results.data;
  }
});

// Safe JSON parser with fix for double quotes
function safeParseJSON(str) {
  try {
    const cleaned = str.replace(/""/g, '"');
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("JSON parse error:", str);
    return [];
  }
}

// Function to show amenities of selected city
function onCityChange(city) {
  selectedCity = city;
  updateMap();
}

function onAmenityTypeChange(type) {
  selectedAmenityType = type;
  updateMap();
  if (typeof updateBubbleChart === "function") {
    updateBubbleChart();
  }
}

function updateMap() {
  amenityLayerGroup.clearLayers();
  if (!selectedCity) return;

  const city = allCityData.find(d => d.City.trim() === selectedCity.trim());
  if (!city) {
    console.warn(`City not found: ${selectedCity}`);
    return;
  }

  const coords = JSON.parse(city.location);
  map.setView([coords[1], coords[0]], 11);

  const amenityTypes = [
    { key: "hospitals", color: "red" },
    { key: "universities", color: "blue" },
    { key: "supermarkets", color: "yellow" }
  ];

  amenityTypes.forEach(({ key, color }) => {
    if (selectedAmenityType !== "all" && selectedAmenityType !== key) return;

    const locations = safeParseJSON(city[`${key}_locations`]);
    locations.forEach(coord => {
      const marker = L.circleMarker([coord[1], coord[0]], {
        radius: 6,
        color: color,
        fillColor: color,
        fillOpacity: 0.8,
        weight: 1
      });
      amenityLayerGroup.addLayer(marker);
    });
  });
}

// Expose dropdown handlers to global scope
window.onCityChange = onCityChange;
window.onAmenityTypeChange = onAmenityTypeChange;