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







//SEARCH AND DISPLAY WITH API LOGIC
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.theme-btn'); // Adjust the selector based on your HTML structure

    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        const queryParams = getSearchParameters();
        fetchCruises(queryParams);
    });

    function getSearchParameters() {
        const area = document.querySelector('select[name="area"]').value;
        const departure = document.querySelector('input[name="departure"]').value;
        const arrival = document.querySelector('input[name="arrival"]').value;
        const adultNumber = document.querySelector('input[name="adult_number"]').value;
        const childNumber = document.querySelector('input[name="child_number"]').value;
        const seniorNumber = document.querySelector('input[name="senior_number"]').value;
        const sea = document.querySelector('select[name="sea"]').value;
        const cruiseLine = document.querySelector('select[name="cruiseLine"]').value;
        const ship = document.querySelector('select[name="ship"]').value;
        const duration = document.querySelector('input[name="duration"]').value;
        const package = document.querySelector('select[name="package"]').value;

        const queryParams = new URLSearchParams({
            area,
            departure,
            arrival,
            adult_number: adultNumber,
            child_number: childNumber,
            senior_number: seniorNumber,
            sea,
            cruiseLine,
            ship,
            duration,
            package
        });

        return queryParams;
    }

    async function fetchCruises(queryParams) {
        try {
            const response = await fetch(`http://rest.api.cruisehost.net/search?${queryParams.toString()}`);
            const cruises = await response.json();
            const consolidatedCruises = consolidateCruises(cruises);
            displayCruises(consolidatedCruises);
            updateCruiseCount(consolidatedCruises.length);
        } catch (error) {
            console.error('Error fetching cruises:', error);
        }
    }

    function consolidateCruises(cruises) {
        // Consolidation logic for cruises based on certain attributes
        const consolidated = {};

        cruises.forEach(cruise => {
            const key = `${cruise.cruiseLine}-${cruise.route}-${cruise.ship}`;
            if (!consolidated[key]) {
                consolidated[key] = { ...cruise, voyages: [] };
            }
            consolidated[key].voyages.push(cruise);
        });

        return Object.values(consolidated);
    }

    function updateCruiseCount(count) {
        document.getElementById('cruise-count').innerText = `${count} Cruises found`;
    }

    function displayCruises(cruises) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        cruises.forEach(cruise => {
            const cruiseItem = document.createElement('div');
            cruiseItem.className = 'col-lg-12';
            cruiseItem.innerHTML = `
                <div class="card-item">
                    <div class="card-body">
                        <div class="col-lg-3 overview-right">
                            <div class="logo">
                                <div class="field field--name-field-cruiseline-logo field--type-entity-reference field--label-hidden field__item">
                                    <article class="media media--type-image media--view-mode-logo">
                                        <div class="field field--name-field-media-image field--type-image field--label-hidden field__item">
                                            <picture>
                                                <source srcset="${cruise.cruiseLineLogo}" type="image/webp" width="200" height="60"/>
                                                <source srcset="${cruise.cruiseLineLogo}" type="image/png" width="200" height="60"/>
                                                <img loading="lazy" src="${cruise.cruiseLineLogo}" width="200" height="60" alt="${cruise.cruiseLine}" class="img-fluid" />
                                            </picture>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="price">
                                <div class="field field--name-field-minimum-price field--type-decimal field--label-above">
                                    <div class="field__label">From</div>
                                    <div class="field__item">${cruise.price}</div>
                                </div>
                                <div class="field field--name-field-per-day-price field--type-decimal field--label-above">
                                    <div class="field__label">Duration</div>
                                    <div class="field__item">${cruise.duration} days</div>
                                </div>
                            </div>
                            <div class="included">
                                <a href="/sailing/${cruise.masterCruiseID}/inclusions" class="use-ajax" data-dialog-type="modal" rel="nofollow" data-dialog-options="{&quot;width&quot;:&quot;700&quot;,&quot;height&quot;:&quot;80%&quot;,&quot;title&quot;:&quot;What&#039;s included in my Cruise?&quot;}">What's Included?</a>
                            </div>
                            <div class="paragraph paragraph--type--voyager-club-cta paragraph--view-mode--full cta-box">
                                <div class="title">
                                    <div class="field field--name-field-heading field--type-string field--label-hidden field__item">Sail Safe</div>
                                </div>
                                <div class="clearfix text-formatted field field--name-field-description field--type-text-long field--label-hidden field__item">
                                    <p>${cruise.title}</p>
                                </div>
                                <a href="/voyager-club/${cruise.masterCruiseID}" class="use-ajax voyager-club-info-link button" data-dialog-type="modal" rel="nofollow" data-dialog-options="{&quot;width&quot;:&quot;700&quot;,&quot;height&quot;:&quot;80%&quot;,&quot;title&quot;:&quot;Sail Safe&quot;}">Learn more</a>
                            </div>
                        </div>
                        <div class="prices-section" style="display: none;">
                            <div class="views-element-container">
                                <div class="view-content">
                                    <table class="table-bordered table table-striped views-table views-view-table cols-7">
                                        <thead>
                                            <tr>
                                                <th class="views-align-center views-field views-field-field-sailing-departure-date views-align-center" scope="col">Departure Date</th>
                                                <th class="views-align-center views-field views-field-field-applicable-rules views-align-center" scope="col">Route</th>
                                                <th class="views-align-center views-field views-field-field-inside-price views-align-center" scope="col">Interior</th>
                                                <th class="views-align-center views-field views-field-field-outside-price views-align-center" scope="col">Oceanview</th>
                                                <th class="views-align-center views-field views-field-field-balcony-price views-align-center" scope="col">Balcony</th>
                                                <th class="views-align-center views-field views-field-field-suite-price views-align-center" scope="col">Suite</th>
                                                <th class="views-field views-field-field-sailing-package-id" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${cruise.voyages.map(voyage => `
                                                <tr>
                                                    <td class="views-field views-field-field-sailing-departure-date views-align-center">
                                                        <time title="Save to Favorite" class="datetime toggle-favourite" data-sailing-id="${voyage.masterCruiseID}" data-sailing-package-id="${voyage.productID}">
                                                            ${new Date(voyage.departure).toLocaleDateString()}
                                                        </time>
                                                    </td>
                                                    <td class="views-field views-field-field-applicable-rules views-align-center">
                                                        ${voyage.route}
                                                    </td>
                                                    <td class="views-field views-field-field-inside-price views-align-center">
                                                        <div class="price">
                                                            <span class="number">${voyage.price}</span>
                                                            <span class="currency">${voyage.currency}</span>
                                                        </div>
                                                    </td>
                                                    <td class="views-field views-field-field-outside-price views-align-center">
                                                        <div class="price">
                                                            <span class="number">${voyage.price}</span>
                                                            <span class="currency">${voyage.currency}</span>
                                                        </div>
                                                    </td>
                                                    <td class="views-field views-field-field-balcony-price views-align-center">
                                                        <div class="price">
                                                            <span class="number">${voyage.price}</span>
                                                            <span class="currency">${voyage.currency}</span>
                                                        </div>
                                                    </td>
                                                    <td class="views-field views-field-field-suite-price views-align-center">
                                                        <div class="price">
                                                            <span class="number">${voyage.price}</span>
                                                            <span class="currency">${voyage.currency}</span>
                                                        </div>
                                                    </td>
                                                    <td class="views-field views-field-field-sailing-package-id">
                                                        <a class="btn btn-primary" href="cruise-details.html?cruiseID=${voyage.masterCruiseID}&productID=${voyage.productID}" rel="noreferrer" target="_blank">Select</a>
                                                    </td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button class="toggle-prices btn btn-link">View Rooms and Prices</button>
                    </div>
                </div>
            `;
            resultsDiv.appendChild(cruiseItem);

            const toggleButton = cruiseItem.querySelector('.toggle-prices');
            const pricesSection = cruiseItem.querySelector('.prices-section');

            toggleButton.addEventListener('click', function () {
                const isVisible = pricesSection.style.display === 'block';
                pricesSection.style.display = isVisible ? 'none' : 'block';
                toggleButton.innerText = isVisible ? 'View Rooms and Prices' : 'Hide Rooms and Prices';
            });
        });
    }
});











































// WITHOUT API LOGIC
//search.js
<script>
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.theme-btn').addEventListener('click', function (e) {
        e.preventDefault();

        // Capture form values
        const destination = document.querySelector('select[name="destination"]').value;
        const departure = document.querySelector('input[name="departure-start"]').value;
        const arrival = document.querySelector('input[name="departure-end"]').value;
        const adult_number = document.querySelector('input[name="adult-number"]').value;
        const child_number = document.querySelector('input[name="child-number"]').value;
        const senior_number = document.querySelector('input[name="senior-number"]').value;
        const sea = document.querySelector('select[name="cruise-type"]').value;
        const cruiseline = document.querySelector('select[name="cruise-line"]').value;
        const ship = document.querySelector('select[name="ship"]').value;
        const duration = document.querySelector('select[name="duration"]').value;
        const package = document.querySelector('select[name="package"]').value;

        // Build query string
        const query = new URLSearchParams({
            area: destination,
            departure,
            arrival,
            adult_number,
            child_number,
            senior_number,
            sea,
            cruiseline,
            ship,
            duration,
            package
        }).toString();

        // Redirect to cruise-list.html with query parameters
        window.location.href = `cruise-list.html?${query}`;
    });
});
</script>
















// Get Cruises List - from the search

<script>
document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    fetchCruises(queryParams);
});

async function fetchCruises(queryParams) {
    try {
        const response = await fetch(`/search?${queryParams.toString()}`);
        const cruises = await response.json();
        const consolidatedCruises = consolidateCruises(cruises);
        displayCruises(consolidatedCruises);
        updateCruiseCount(consolidatedCruises.length);
    } catch (error) {
        console.error('Error fetching cruises:', error);
    }
}

function updateCruiseCount(count) {
    document.getElementById('cruise-count').innerText = `Showing ${count} Cruises`;
}

function displayCruises(cruises) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    cruises.forEach(cruise => {
        const cruiseItem = document.createElement('div');
        cruiseItem.className = 'col-lg-12';
        cruiseItem.innerHTML = `
            <div class="card-item">
                <div class="card-body">
                    <div class="col-lg-3 overview-right">
                        <div class="logo">
                            <div class="field field--name-field-cruiseline-logo field--type-entity-reference field--label-hidden field__item">
                                <article class="media media--type-image media--view-mode-logo">
                                    <div class="field field--name-field-media-image field--type-image field--label-hidden field__item">
                                        <picture>
                                            <source srcset="${cruise.cruiseLineLogo}" type="image/webp" width="200" height="60"/>
                                            <source srcset="${cruise.cruiseLineLogo}" type="image/png" width="200" height="60"/>
                                            <img loading="lazy" src="${cruise.cruiseLineLogo}" width="200" height="60" alt="${cruise.cruiseLine}" class="img-fluid" />
                                        </picture>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div class="price">
                            <div class="field field--name-field-minimum-price field--type-decimal field--label-above">
                                <div class="field__label">From</div>
                                <div class="field__item">${cruise.price}</div>
                            </div>
                            <div class="field field--name-field-per-day-price field--type-decimal field--label-above">
                                <div class="field__label">Duration</div>
                                <div class="field__item">${cruise.duration} days</div>
                            </div>
                        </div>
                        <div class="included">
                            <a href="/sailing/${cruise.masterCruiseID}/inclusions" class="use-ajax" data-dialog-type="modal" rel="nofollow" data-dialog-options="{&quot;width&quot;:&quot;700&quot;,&quot;height&quot;:&quot;80%&quot;,&quot;title&quot;:&quot;What&#039;s included in my Cruise?&quot;}">What's Included?</a>
                        </div>
                        <div class="paragraph paragraph--type--voyager-club-cta paragraph--view-mode--full cta-box">
                            <div class="title">
                                <div class="field field--name-field-heading field--type-string field--label-hidden field__item">Sail Safe</div>
                            </div>
                            <div class="clearfix text-formatted field field--name-field-description field--type-text-long field--label-hidden field__item">
                                <p>${cruise.title}</p>
                            </div>
                            <a href="/voyager-club/${cruise.masterCruiseID}" class="use-ajax voyager-club-info-link button" data-dialog-type="modal" rel="nofollow" data-dialog-options="{&quot;width&quot;:&quot;700&quot;,&quot;height&quot;:&quot;80%&quot;,&quot;title&quot;:&quot;Sail Safe&quot;}">Learn more</a>
                        </div>
                    </div>
                    <div class="prices-section" style="display: none;">
                        <div class="views-element-container">
                            <div class="view-content">
                                <table class="table-bordered table table-striped views-table views-view-table cols-7">
                                    <thead>
                                        <tr>
                                            <th class="views-align-center views-field views-field-field-sailing-departure-date views-align-center" scope="col">Departure Date</th>
                                            <th class="views-align-center views-field views-field-field-applicable-rules views-align-center" scope="col">Route</th>
                                            <th class="views-align-center views-field views-field-field-inside-price views-align-center" scope="col">Interior</th>
                                            <th class="views-align-center views-field views-field-field-outside-price views-align-center" scope="col">Oceanview</th>
                                            <th class="views-align-center views-field views-field-field-balcony-price views-align-center" scope="col">Balcony</th>
                                            <th class="views-align-center views-field views-field-field-suite-price views-align-center" scope="col">Suite</th>
                                            <th class="views-field views-field-field-sailing-package-id" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${cruise.voyages.map(voyage => `
                                            <tr>
                                                <td class="views-field views-field-field-sailing-departure-date views-align-center">
                                                    <time title="Save to Favorite" class="datetime toggle-favourite" data-sailing-id="${voyage.masterCruiseID}" data-sailing-package-id="${voyage.productID}">
                                                        ${new Date(voyage.departure).toLocaleDateString()}
                                                    </time>
                                                </td>
                                                <td class="views-field views-field-field-applicable-rules views-align-center">
                                                    ${voyage.route}
                                                </td>
                                                <td class="views-field views-field-field-inside-price views-align-center">
                                                    <div class="price">
                                                        <span class="number">${voyage.price}</span>
                                                        <span class="currency">${voyage.currency}</span>
                                                    </div>
                                                </td>
                                                <td class="views-field views-field-field-outside-price views-align-center">
                                                    <div class="price">
                                                        <span class="number">${voyage.price}</span>
                                                        <span class="currency">${voyage.currency}</span>
                                                    </div>
                                                </td>
                                                <td class="views-field views-field-field-balcony-price views-align-center">
                                                    <div class="price">
                                                        <span class="number">${voyage.price}</span>
                                                        <span class="currency">${voyage.currency}</span>
                                                    </div>
                                                </td>
                                                <td class="views-field views-field-field-suite-price views-align-center">
                                                    <div class="price">
                                                        <span class="number">${voyage.price}</span>
                                                        <span class="currency">${voyage.currency}</span>
                                                    </div>
                                                </td>
                                                <td class="views-field views-field-field-sailing-package-id">
                                                    <a class="btn btn-primary" href="https://book.cruisedirect.com/swift/cruise/package/${voyage.productID}?siid=${voyage.masterCruiseID}" rel="noreferrer" target="_blank">Select</a>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button class="toggle-prices-btn btn btn-secondary mt-2">View Rooms and Prices</button>
                </div>
            </div>
        `;
        resultsDiv.appendChild(cruiseItem);
    });

    document.querySelectorAll('.toggle-prices-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const pricesSection = this.previousElementSibling;
            pricesSection.style.display = pricesSection.style.display === 'none' ? 'block' : 'none';
            this.innerText = pricesSection.style.display === 'none' ? 'View Rooms and Prices' : 'Hide Rooms and Prices';
        });
    });
}

function consolidateCruises(cruises) {
    const cruiseMap = {};

    cruises.forEach(cruise => {
        const key = `${cruise.cruiseLine}-${cruise.route}-${cruise.ship}`;

        if (!cruiseMap[key]) {
            cruiseMap[key] = {
                ...cruise,
                voyages: []
            };
        }

        cruiseMap[key].voyages.push({
            masterCruiseID: cruise.masterCruiseID,
            productID: cruise.productID,
            departure: cruise.departure,
            price: cruise.price,
            currency: cruise.currency,
            route: cruise.route
        });
    });

    return Object.values(cruiseMap);
}
</script>










// scripts/cruise-details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mastercruiseid = urlParams.get('mastercruiseid');

    if (mastercruiseid) {
        fetch(`/cruises/${mastercruiseid}`)
            .then(response => response.json())
            .then(cruise => {
                // Populate cruise details
                document.getElementById('cruise-title').innerText = cruise.title;
                document.getElementById('cruise-dates').innerText = `${new Date(cruise.departure).toLocaleDateString()} - ${new Date(cruise.arrival).toLocaleDateString()}`;
                document.getElementById('cruise-route').innerText = `Ports of Call: ${cruise.route.map(day => day.port).join(', ')}`;
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
                document.getElementById('included-list').innerHTML = cruise.included.map(item => `<li>${item}</li>`).join('');
                document.getElementById('excluded-list').innerHTML = cruise.excluded.map(item => `<li>${item}</li>`).join('');

                // Populate itinerary table
                document.getElementById('itinerary-table').innerHTML = cruise.route.map(day => `
                    <tr>
                        <td>${day.number}</td>
                        <td>${day.port}, ${day.country}</td>
                        <td>${day.arrival}</td>
                        <td>${day.departure}</td>
                    </tr>
                `).join('');

                // Initialize the map
                var map = L.map('map').setView([cruise.route[0].lat, cruise.route[0].long], 5);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Define the cruise route coordinates
                var cruiseRoute = cruise.route.map(point => [point.lat, point.long]);

                // Create a polyline for the cruise route
                var cruisePolyline = L.polyline(cruiseRoute, {
                    color: 'blue'
                }).addTo(map);

                // Add markers for each port of call
                cruise.route.forEach(point => {
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