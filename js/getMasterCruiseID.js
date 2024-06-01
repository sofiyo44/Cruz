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






























// Cabin API Call and strip intergration CHANGE SOON DOES NOT HAVE FORM OR TOTAL LOGIC

document.addEventListener('DOMContentLoaded', async function () {
    // Replace this with your actual API call
    const response = await fetch('https://api.example.com/cabins');
    const cabinData = await response.json();

    const showParentImage = (parent) => {
        const parentImageContainer = document.getElementById('parent-image');
        parentImageContainer.innerHTML = `
            <img src="${parent.img}" alt="${parent.text}" class="img-fluid">
        `;
    };

    const createChildCard = (child) => {
        return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${child.text}</h5>
                        <p class="card-text">Price: ${child.price}</p>
                        <p class="card-text">Availability: ${child.availability}</p>
                        <ul class="card-text" style="font-size: 0.9em;">
                            ${child.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <button class="btn btn-primary select-cabin-btn" data-cabin-id="${child.id}" data-cabin-price="${child.price_touroperator}">Select</button>
                    </div>
                </div>
            </div>
        `;
    };

    const populateChildCards = (parent) => {
        const cabinCardsContainer = document.getElementById('cabin-cards');
        cabinCardsContainer.innerHTML = parent.children.map(child => createChildCard(child)).join('');
    };

    const populateCabinChips = () => {
        const cabinChipsContainer = document.getElementById('cabin-chips');
        cabinChipsContainer.innerHTML = Object.keys(cabinData).map(key => {
            const cabin = cabinData[key];
            return `
                <button class="btn btn-outline-primary m-1 cabin-chip" data-cabin-id="${cabin.id}">${cabin.text}</button>
            `;
        }).join('');
    };

    document.getElementById('cabin-chips').addEventListener('click', function (e) {
        if (e.target.classList.contains('cabin-chip')) {
            const cabinId = e.target.getAttribute('data-cabin-id');
            const selectedCabin = cabinData[cabinId];
            showParentImage(selectedCabin);
            populateChildCards(selectedCabin);
            const chips = document.querySelectorAll('.cabin-chip');
            chips.forEach(chip => chip.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    document.getElementById('cabin-cards').addEventListener('click', function (e) {
        if (e.target.classList.contains('select-cabin-btn')) {
            const buttons = document.querySelectorAll('.select-cabin-btn');
            buttons.forEach(button => button.textContent = 'Select');
            e.target.textContent = 'Selected';
            const selectedCabinPrice = e.target.getAttribute('data-cabin-price');
            document.getElementById('paymentForm').style.display = 'block';
            setupStripe(selectedCabinPrice);
        }
    });

    const setupStripe = (amount) => {
        const stripe = Stripe('your-publishable-key-here');
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');

        document.getElementById('payButton').addEventListener('click', async () => {
            const { paymentIntent, error } = await stripe.confirmCardPayment('client-secret-here', {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Customer Name'
                    }
                }
            });

            if (error) {
                console.error(error);
                alert('Payment failed');
            } else {
                alert('Payment successful');
                // Process the order on your server
                await fetch('https://api.example.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount,
                        paymentIntentId: paymentIntent.id
                    })
                });
            }
        });
    };

    // Initial setup
    populateCabinChips();
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
<script>
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const masterCruiseID = urlParams.get('cruiseID');

    if (masterCruiseID) {
        fetch(`http://rest.api.cruisehost.net/cruises/${masterCruiseID}`)
            .then(response => response.json())
            .then(data => {
                populateCruiseDetails(data);
            })
            .catch(error => console.error('Error fetching cruise details:', error));
    }

    function populateCruiseDetails(data) {
        // Populate cruise details
        document.getElementById('cruise-title').innerText = data.title;
        document.getElementById('cruise-title-sidebar').innerText = data.title;
        document.getElementById('cruise-dates').innerText = `${data.departure_cruise} - ${data.arrival_cruise}`;
        document.getElementById('cruise-route').innerText = "Ports of Call: " + data.route.days.map(day => day.port).join(', ');
        document.getElementById('ship-description').innerHTML = data.ship.description;

        // Ship statistics
        document.getElementById('ship-statistics-left').innerHTML = `
            <li>Year Built: ${data.ship.details.year}</li>
            <li>Speed: ${data.ship.details.speed} knots</li>
            <li>Cabins: ${data.ship.details.cabins}</li>
        `;
        document.getElementById('ship-statistics-right').innerHTML = `
            <li>Passengers: ${data.ship.details.passengers}</li>
            <li>Weight: ${data.ship.details.weight} tons</li>
            <li>Length: ${data.ship.details.length} meters</li>
        `;

        // Included and Not Included
        document.getElementById('included-list').innerHTML = data.included;
        document.getElementById('excluded-list').innerHTML = data.excluded;

        // Populate itinerary table
        document.getElementById('itinerary-table').innerHTML = data.route.days.map(day => `
            <tr>
                <td>${day.number}</td>
                <td>${day.port}, ${day.country}</td>
                <td>${day.arrival}</td>
                <td>${day.departure}</td>
            </tr>
        `).join('');

        // Populate cabins
        document.getElementById('cabin-types').innerHTML = data.pricecat.map(cabin => `
            <div class="cabin-card" style="display: flex; align-items: center; margin-bottom: 20px;">
                <img src="${data.ship.images.cabin.find(img => img.name === cabin.id)?.url || '//images.cruisec.net/images/ships/cabins/no_image.jpg'}" style="width: 300px; height: auto; margin-right: 20px;" alt="${cabin.text}">
                <div style="flex-grow: 1;">
                    <h5 class="card-title">${cabin.text}</h5>
                    <p class="card-text">${cabin.price}</p>
                    <ul class="list-items" style="font-size: 10px; list-style-type: disc; padding-left: 20px;">
                        ${cabin.description ? cabin.description.map(desc => `<li style="margin-bottom: 2px;">${desc}</li>`).join('') : ''}
                    </ul>
                </div>
                <button class="btn btn-primary select-cabin-btn" data-cabin-id="${cabin.id}" data-cabin-text="${cabin.text}" data-cabin-price="${cabin.price}" style="margin-left: 20px;">Select Cabin</button>
            </div>
        `).join('');

        // Populate photo gallery
        document.getElementById('carousel-images').innerHTML = data.ship.images.gallery.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image.url}" class="d-block w-100" alt="${image.name}">
            </div>
        `).join('');

        // Sidebar price
        document.getElementById('cruise-price').innerText = data.price;

        // Sidebar cabin selection logic
        document.querySelectorAll('.select-cabin-btn').forEach(button => {
            button.addEventListener('click', function () {
                const cabinId = this.getAttribute('data-cabin-id');
                const cabinText = this.getAttribute('data-cabin-text');
                const cabinPrice = parseFloat(this.getAttribute('data-cabin-price').replace(/[^0-9.-]+/g,""));

                const selectedCabinList = document.getElementById('selected-cabin-list');
                let existingCabin = selectedCabinList.querySelector(`li[data-cabin-id="${cabinId}"]`);

                if (existingCabin) {
                    const qtyInput = existingCabin.querySelector('.qtyInput');
                    qtyInput.value = parseInt(qtyInput.value) + 1;
                } else {
                    existingCabin = document.createElement('li');
                    existingCabin.setAttribute('data-cabin-id', cabinId);
                    existingCabin.innerHTML = `
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
                    selectedCabinList.appendChild(existingCabin);

                    existingCabin.querySelector('.qtyDec').addEventListener('click', function () {
                        const input = this.nextElementSibling;
                        if (parseInt(input.value) > 1) {
                            input.value = parseInt(input.value) - 1;
                        } else {
                            existingCabin.remove();
                        }
                        updateTotalPrice();
                    });

                    existingCabin.querySelector('.qtyInc').addEventListener('click', function () {
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
            let total = Array.from(document.querySelectorAll('#selected-cabin-list li')).reduce((acc, item) => {
                const price = parseFloat(item.querySelector('.cabin-price').innerText.replace(/[^0-9.-]+/g,""));
                const quantity = parseInt(item.querySelector('.qtyInput').value);
                return acc + (price * quantity);
            }, 0);
            document.getElementById('total-price').innerText = `Total Price: $${total.toFixed(2)}`;
        }

        // Populate amenities list
        const amenitiesHTML = data.ship.features.map(category => `
            <div class="col-lg-4">
                <h4>${category.text}</h4>
                <ul class="list-items">
                    ${category.children.map(item => `<li>${item.text}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        document.getElementById('amenities-list').innerHTML = amenitiesHTML;
    }
});
</script>
