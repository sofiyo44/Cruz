// cruise-details.js

document.addEventListener('DOMContentLoaded', function () {
    const cruise = {
        "title": "Atlantic Ocean Europe 7 days from/to Portsmouth",
        "departure": "9/23/24",
        "mastercruiseID": "I7259565240929",
        "price": "$743",
        "included": "<ul><br>\n<li>Cruise in the cabin category booked.</li>\n<li>Full board.</li>\n<li>Entertainment program on board.</li>\n<li>Use of onboard facilities. (extra charges possible)</li>\n<li>Port charges and taxes.</li>\n<li>Luggages transportation to/from cabin.</li>\n<hr></ul>\n<br>\n<br>",
        "excluded": "<br>\n<ul><br>\n<li>Arrival and departure.</li>\n<li>Beverages, unless specified</li>\n<li>Meals and drinks in the specialty restaurants.</li>\n<li>Personal expenses aboard.</li>\n<li>Shore excursions.</li>\n<li>Medical service.</li>\n<li>Travel insurances.</li>\n<li>Recommended gratuities</li>\n<li>Visa, if necessary (extra charges possible).</li>\n</ul>\n<br>",
        "ship": {
            "name": "Resilient Lady",
            "details": {
                "year": "2023",
                "speed": "20kn",
                "cabins": "1404",
                "passengers": "2762",
                "weight": "110,000",
                "length": "278",
            },
            "description": "From decadent dinners to boozy after-parties, gather with your partner, your best friends and yourself to celebrate life&#39;s best moments aboard one of the 100% adults-only voyages."
        },
        "route": {
            "days": [
                { "number": "1", "port": "Portsmouth", "country": "United Kingdom", "arrival": "", "departure": "18:00" },
                { "number": "2", "port": "Cruising Day", "country": "", "arrival": "", "departure": "" },
                { "number": "3", "port": "La Coruna", "country": "Spain", "arrival": "08:00", "departure": "17:00" },
                { "number": "4", "port": "Bilbao", "country": "Spain", "arrival": "10:00", "departure": "18:00" },
                { "number": "5", "port": "Le Verdon-sur-Mer", "country": "France", "arrival": "08:00", "departure": "20:00" },
                { "number": "6", "port": "Cruising Day", "country": "", "arrival": "", "departure": "" },
                { "number": "7", "port": "Portsmouth", "country": "United Kingdom", "arrival": "06:00", "departure": "" }
            ]
        }
    };

    // Function to store cruise details in localStorage and redirect to details page
    function viewCruiseDetails() {
        localStorage.setItem('selectedCruise', JSON.stringify(cruise));
        window.location.href = 'cruise-details.html';
    }

    // Add event listeners to buttons or links
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            viewCruiseDetails();
        });
    });

    // Code to populate the cruise details page
    if (window.location.pathname.includes('cruise-details.html')) {
        const selectedCruise = JSON.parse(localStorage.getItem('selectedCruise'));
        if (selectedCruise) {
            document.getElementById('cruise-title').innerText = selectedCruise.title;
            document.getElementById('cruise-route').innerText = `${selectedCruise.route.days[0].port} to ${selectedCruise.route.days[selectedCruise.route.days.length - 1].port}`;
            document.getElementById('ship-description').innerHTML = selectedCruise.ship.description;

            const leftStats = document.getElementById('ship-statistics-left');
            const rightStats = document.getElementById('ship-statistics-right');
            leftStats.innerHTML = `
                <li><span>Year Built:</span> ${selectedCruise.ship.details.year}</li>
                <li><span>Speed:</span> ${selectedCruise.ship.details.speed}</li>
            `;
            rightStats.innerHTML = `
                <li><span>Cabins:</span> ${selectedCruise.ship.details.cabins}</li>
                <li><span>Passengers:</span> ${selectedCruise.ship.details.passengers}</li>
                <li><span>Weight:</span> ${selectedCruise.ship.details.weight}</li>
                <li><span>Length:</span> ${selectedCruise.ship.details.length}</li>
            `;

            document.getElementById('included-list').innerHTML = selectedCruise.included;
            document.getElementById('excluded-list').innerHTML = selectedCruise.excluded;

            const itineraryTable = document.getElementById('itinerary-table');
            selectedCruise.route.days.forEach(day => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${day.number}</td>
                    <td>${day.port}, ${day.country}</td>
                    <td>${day.arrival}</td>
                    <td>${day.departure}</td>
                `;
                itineraryTable.appendChild(row);
            });
        } else {
            document.getElementById('cruise-title').innerText = 'No cruise details found.';
        }
    }
});
