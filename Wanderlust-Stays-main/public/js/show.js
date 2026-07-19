// ==========================================
// Rating Stars Logic
// ==========================================
let stars = document.querySelectorAll('.rating-star');
let inputField = document.getElementById('rating-value');

if (stars.length > 0) {
  // Set default initial rating to 3 stars
  updateFilledStars(3);

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      let ratingValue = star.getAttribute('data-value');

      if (inputField) {
        inputField.value = ratingValue;
      }

      updateFilledStars(ratingValue);
    });
  });
}

function updateFilledStars(value) {
  stars.forEach((star) => {
    let starValue = star.getAttribute('data-value');

    if (starValue <= value) {
      star.classList.remove('fa-regular');
      star.classList.add('fa-solid');
    } else {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    }
  });
}

// ==========================================
// Map Logic (Leaflet Integration)
// ==========================================

// 1. Strict safety check: Fallback to global defaults if coordinates are missing or unpopulated in Atlas
let coordinates = [77.2090, 28.6139]; // Default coordinates (e.g., New Delhi)

if (
  listing && 
  listing.geometry && 
  Array.isArray(listing.geometry.coordinates) && 
  listing.geometry.coordinates.length === 2
) {
  coordinates = listing.geometry.coordinates;
}

// SWAP GeoJSON format [Longitude, Latitude] to what Leaflet requires: [Latitude, Longitude]
let mapCoordinates = [coordinates[1], coordinates[0]];

// Custom Marker Design Configuration
const icon = L.icon({
  iconUrl: '/assets/compass.svg',
  iconSize:     [40, 40],
  iconAnchor:   [20, 20],
  popupAnchor:  [0, -20],
});

// Initialize the map frame container
const map = L.map('map').setView(mapCoordinates, 10);

// Fetch global open street tile rendering layout maps
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Place a custom pinpoint marker above the validated map coordinates
L.marker(mapCoordinates, { icon: icon })
  .addTo(map)
  .bindPopup(`
    <div style="text-align: center;">
      <h4 style="color: #fe424d; margin: 0;">${listing.title || 'Destination'}</h4>
      <p style="margin: 5px 0;">Exact location provided after booking.</p>
      <p style="font-weight: bold; font-size: 1.1rem;">₹ ${(listing.price || 0).toLocaleString("en-IN")}/night</p>
    </div>
  `)
  .openPopup();

// Fixes the dynamic page-load rendering race condition. 
// Forces Leaflet to recalculate container bounds after elements settle.
setTimeout(() => {
  map.invalidateSize();
}, 250);