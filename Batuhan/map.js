// Initialize the Leaflet map centered on Canada
const map = L.map('map').setView([54, -100], 4);

// Add custom tile layer for better appearance
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
}).addTo(map);

// Layer for amenities
const amenityLayerGroup = L.layerGroup().addTo(map);

// Load CSV and store globally
let allCityData = [];
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
function showAmenities(cityName) {
  amenityLayerGroup.clearLayers();

  const city = allCityData.find(d => d.City.trim() === cityName.trim());
  if (!city) {
    console.warn(`City not found: ${cityName}`);
    return;
  }

  const coords = JSON.parse(city.location);
  map.setView([coords[1], coords[0]], 11); // zoom into the city

  const amenityTypes = [
    { key: "hospitals", color: "red" },
    { key: "universities", color: "blue" },
    { key: "supermarkets", color: "yellow" }
  ];

  amenityTypes.forEach(({ key, color }) => {
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
