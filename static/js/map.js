// Initialize the Leaflet map centered on Canada
const map = L.map('map').setView([54, -100], 4);

// Add custom tile layer for better appearance
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer for amenities
const amenityLayerGroup = L.layerGroup().addTo(map);

// Load CSV and store globally
let allCityData = [];
let selectedCity = null;
let selectedAmenityType = "all";

Papa.parse("static/data/dashboard_data.csv", {
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