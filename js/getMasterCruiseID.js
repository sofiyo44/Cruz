// GET Search
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let cruises = [
    { id: 1, destination: 'Caribbean', departure: '2024-06-01', arrival: '2024-06-08', duration: 7, type: 'Sea', cruiseline: 'CCL', ship: 'Breeze', adult_number: 2, child_number: 0, senior_number: 0, package: 'yes' },
    { id: 2, destination: 'Mediterranean', departure: '2024-07-15', arrival: '2024-07-25', duration: 10, type: 'River', cruiseline: 'CEL', ship: 'Apex', adult_number: 2, child_number: 2, senior_number: 0, package: 'no' },
    // Add more cruise data as needed
];

app.get('/search', (req, res) => {
    const { area, departure, arrival, adult_number, child_number, senior_number, sea, cruiseline, ship, duration, package } = req.query;
    let results = cruises;

    if (area) {
        results = results.filter(cruise => cruise.destination.toLowerCase() === area.toLowerCase());
    }

    if (departure) {
        results = results.filter(cruise => new Date(cruise.departure) >= new Date(departure));
    }

    if (arrival) {
        results = results.filter(cruise => new Date(cruise.arrival) <= new Date(arrival));
    }

    if (adult_number) {
        results = results.filter(cruise => cruise.adult_number >= parseInt(adult_number, 10));
    }

    if (child_number) {
        results = results.filter(cruise => cruise.child_number >= parseInt(child_number, 10));
    }

    if (senior_number) {
        results = results.filter(cruise => cruise.senior_number >= parseInt(senior_number, 10));
    }

    if (sea) {
        results = results.filter(cruise => cruise.type.toLowerCase() === (sea === '1' ? 'sea' : 'river'));
    }

    if (cruiseline) {
        results = results.filter(cruise => cruise.cruiseline.toLowerCase() === cruiseline.toLowerCase());
    }

    if (ship) {
        results = results.filter(cruise => cruise.ship.toLowerCase() === ship.toLowerCase());
    }

    if (duration) {
        let durationRange = duration.split('-');
        let minDuration = parseInt(durationRange[0], 10);
        let maxDuration = durationRange[1] ? parseInt(durationRange[1], 10) : Number.MAX_VALUE;
        results = results.filter(cruise => cruise.duration >= minDuration && cruise.duration <= maxDuration);
    }

    if (package) {
        if (package === 'yes') {
            results = results.filter(cruise => cruise.package === 'yes');
        }
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












// scripts/cruise-details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mastercruiseID = urlParams.get('mastercruiseID');

    if (mastercruiseID) {
        fetch(`https://api.example.com/cruises/${mastercruiseID}`)
            .then(response => response.json())
            .then(cruise => {
                // Populate cruise details
                document.getElementById('cruise-title').innerText = cruise.title;
                document.getElementById('cruise-route').innerText = `Ports of Call: ${cruise.route.days.map(day => day.port).join(', ')}`;
                document.getElementById('ship-description').innerHTML = cruise.ship.description;

                // Ship statistics
                document.getElementById('ship-statistics-left').innerHTML = `
                    <li>Year Built: ${cruise.ship.details.year}</li>
                    <li>Speed: ${cruise.ship.details.speed}</li>
                    <li>Cabins: ${cruise.ship.details.cabins}</li>
                `;
                document.getElementById('ship-statistics-right').innerHTML = `
                    <li>Passengers: ${cruise.ship.details.passengers}</li>
                    <li>Weight: ${cruise.ship.details.weight}</li>
                    <li>Length: ${cruise.ship.details.length}m</li>
                `;

                // Included and Not Included
                document.getElementById('included-list').innerHTML = cruise.included;
                document.getElementById('excluded-list').innerHTML = cruise.excluded;

                // Populate itinerary table
                document.getElementById('itinerary-table').innerHTML = cruise.route.days.map(day => `
                    <tr>
                        <td>${day.number}</td>
                        <td>${day.port}, ${day.country}</td>
                        <td>${day.arrival}</td>
                        <td>${day.departure}</td>
                    </tr>
                `).join('');

                // Initialize the map
                var map = L.map('map').setView([cruise.route.points[0].lat, cruise.route.points[0].long], 5);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Define the cruise route coordinates
                var cruiseRoute = cruise.route.points.map(point => [point.lat, point.long]);

                // Create a polyline for the cruise route
                var cruisePolyline = L.polyline(cruiseRoute, {
                    color: 'blue'
                }).addTo(map);

                // Add markers for each port of call
                cruise.route.points.forEach(point => {
                    L.marker([point.lat, point.long]).addTo(map).bindPopup(point.text);
                });

                // Adjust the map view to fit the cruise route
                map.fitBounds(cruisePolyline.getBounds());

                // Photo gallery
                document.getElementById('carousel-images').innerHTML = cruise.ship.images.gallery.map((image, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${image.url}" class="d-block w-100" alt="${image.name}">
                    </div>
                `).join('');

                // Sidebar price and cabin selection logic
                const cabinTypes = cruise.pricecat.map(cabin => `
                    <div class="cabin-card" style="display: flex; align-items: center; margin-bottom: 20px;">
                        <img src="${cruise.ship.images.cabin.find(img => img.name === cabin.id).url}" style="width: 150px; height: auto; margin-right: 20px;" alt="${cabin.text}">
                        <div style="flex-grow: 1;">
                            <h5 class="card-title">${cabin.text}</h5>
                            <p class="card-text">${cabin.price}</p>
                        </div>
                        <button class="btn btn-primary select-cabin-btn" data-cabin-id="${cabin.id}" data-cabin-text="${cabin.text}" data-cabin-price="${cabin.price}" style="margin-left: 20px;">Select Cabin</button>
                    </div>
                `).join('');
                document.getElementById('cabin-types').innerHTML = cabinTypes;

                document.querySelectorAll('.select-cabin-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const cabinId = this.getAttribute('data-cabin-id');
                        const cabinText = this.getAttribute('data-cabin-text');
                        const cabinPrice = parseFloat(this.getAttribute('data-cabin-price').replace(/[^0-9.-]+/g, ""));

                        const selectedCabinList = document.getElementById('selected-cabin-list');
                        const existingCabin = selectedCabinList.querySelector(`li[data-cabin-id="${cabinId}"]`);

                        if (existingCabin) {
                            const qtyInput = existingCabin.querySelector('.qtyInput');
                            qtyInput.value = parseInt(qtyInput.value) + 1;
                        } else {
                            const listItem = document.createElement('li');
                            listItem.setAttribute('data-cabin-id', cabinId);
                            listItem.innerHTML = `
                                <div class="d-flex align-items-center justify-content-between">
                                    <span>${cabinText}</span>
                                    <span class="cabin-price">${cabinPrice.toFixed(2)}</span>
                                    <div class="qtyBtn d-flex align-items-center">
                                        <div class="qtyDec"><i class="la la-minus"></i></div>
                                        <input type="text" class="qtyInput" value="1" readonly>
                                        <div class="qtyInc"><i class="la la-plus"></i></div>
                                    </div>
                                </div>
                            `;
                            selectedCabinList.appendChild(listItem);

                            listItem.querySelector('.qtyDec').addEventListener('click', function () {
                                const input = this.nextElementSibling;
                                if (parseInt(input.value) > 1) {
                                    input.value = parseInt(input.value) - 1;
                                    updateTotalPrice();
                                } else {
                                    listItem.remove();
                                    updateTotalPrice();
                                }
                            });

                            listItem.querySelector('.qtyInc').addEventListener('click', function () {
                                const input = this.previousElementSibling;
                                input.value = parseInt(input.value) + 1;
                                updateTotalPrice();
                            });
                        }

                        this.innerText = 'Selected';
                        this.disabled = true;

                        updateTotalPrice();
                    });
                });

                function updateTotalPrice() {
                    let total = 0;
                    document.querySelectorAll('#selected-cabin-list li').forEach(item => {
                        const price = parseFloat(item.querySelector('.cabin-price').innerText.replace(/[^0-9.-]+/g, ""));
                        const quantity = parseInt(item.querySelector('.qtyInput').value);
                        total += price * quantity;
                    });
                    document.getElementById('total-price').innerText = `Total Price: $${total.toFixed(2)}`;
                }

                // Populate amenities list
                const amenitiesHTML = cruise.ship.features.map(category => `
                    <div class="col-lg-4">
                        <h4>${category.text}</h4>
                        <ul class="list-items">
                            ${category.children.map(item => `<li>${item.text}</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
                document.getElementById('amenities-list').innerHTML = amenitiesHTML;
            })
            .catch(error => console.error('Error fetching cruise details:', error));
    } else {
        document.getElementById('cruise-details').innerText = 'No cruise ID provided.';
    }
});
