// Navigation
function navigate(page) {
window.location.href = page;
}

// Modal
const modal = document.getElementById('bookingModal');
function openModal() {
modal.style.display = 'flex';
}
function closeModal() {
modal.style.display = 'none';
}
window.onclick = function(event) {
if (event.target == modal) modal.style.display = "none";
}

// Destinations
let destinations = [];
let loadedCount = 0;
const batchSize = 2;

async function loadDestinations() {
try {
const response = await fetch('destinations.json');
destinations = await response.json();
displayDestinations();
} catch (error) {
console.error("Error loading destinations:", error);
}
}

function displayDestinations() {
const container = document.getElementById('destinations');
if (!container) return;
const batch = destinations.slice(loadedCount, loadedCount + batchSize);
batch.forEach(dest => {
const card = document.createElement('div');
card.className = 'destination-card';
card.innerHTML = `
<img src="${dest.image}" alt="${dest.name}">
<h3>${dest.name}, ${dest.country}</h3>
<p>${dest.description}</p>
`;
container.appendChild(card);
});
loadedCount += batchSize;
}

// Infinite scroll
window.addEventListener('scroll', () => {
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
if (loadedCount < destinations.length) displayDestinations();
}
});

// Search and Clear
function searchDestinations() {
const input = document.getElementById('searchInput');
if (!input) return;
const val = input.value.toLowerCase();
const container = document.getElementById('destinations');
if (!container) return;
container.innerHTML = '';
loadedCount = 0;
const filtered = destinations.filter(dest =>
dest.name.toLowerCase().includes(val) || dest.country.toLowerCase().includes(val)
);
displayFiltered(filtered);
}

function displayFiltered(filtered) {
const container = document.getElementById('destinations');
if (!container) return;
filtered.forEach(dest => {
const card = document.createElement('div');
card.className = 'destination-card';
card.innerHTML = `
<img src="${dest.image}" alt="${dest.name}">
<h3>${dest.name}, ${dest.country}</h3>
<p>${dest.description}</p>
`;
container.appendChild(card);
});
}

function clearSearch() {
const input = document.getElementById('searchInput');
if (input) input.value = '';
const container = document.getElementById('destinations');
if (container) container.innerHTML = '';
loadedCount = 0;
loadDestinations();
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if(contactForm){
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
alert("Message sent successfully!");
contactForm.reset();
});
}

