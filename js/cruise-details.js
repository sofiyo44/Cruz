document.addEventListener('DOMContentLoaded', function() {
    function fetchCruiseDetails() {
        fetch('http://rest.api.cruisehost.net/details?cruiseId=XYZ', {
            headers: {
                'Authorization': 'Bearer 100|rpwdRN5Ay3zjLuwmlLO8TjTSUuYfpmlzxsD8r97y'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response issue');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cruise-description').innerHTML = `<p>${data.description}</p>`;
            document.getElementById('ship-statistics').innerHTML = generateStatsHtml(data);
            document.getElementById('whats-included').innerHTML = generateListHtml(data.whatsIncluded);
            document.getElementById('ship-amenities').innerHTML = generateListHtml(data.amenities);
            document.getElementById('cruise-itinerary').innerHTML = generateItineraryHtml(data.itinerary);
            document.getElementById('cruise-date-availability').innerHTML = generateDateAvailabilityHtml(data.dateAvailabilities);
            document.getElementById('cabin-types').innerHTML = generateCabinHtml(data.cabinTypes);
            document.getElementById('cruise-policies').innerHTML = `<p>${data.policies}</p>`;
        })
        .catch(error => {
            console.error('Failed to load cruise details:', error);
            document.getElementById('cruise-description').innerHTML = `<p>Error loading cruise details. Please check your connection and try again.</p>`;
            alert('Failed to fetch cruise details. Please try again later.');
        });
    }

    // Helper functions for generating HTML content
    function generateStatsHtml(data) {
        return `
            <p><strong>Date Launched:</strong> ${data.dateLaunched}</p>
            <p><strong>Age of Ship:</strong> ${data.ageOfShip} years</p>
            <p><strong>Refurbished Date:</strong> ${data.refurbishedDate}</p>
            <p><strong>Tonnage:</strong> ${data.tonnage} grt</p>
            <p><strong>Length:</strong> ${data.length} ft</p>
            <p><strong>Beam:</strong> ${data.beam} ft</p>
            <p><strong>Draft:</strong> ${data.draft} ft</p>
            <p><strong>Speed:</strong> ${data.speed} knots</p>
            <p><strong>Guest Capacity:</strong> ${data.guestCapacity}</p>
            <p><strong>Total Staff:</strong> ${data.totalStaff} crew</p>
            <p><strong>Officers:</strong> ${data.officers}</p>
            <p><strong>Dining Crew:</strong> ${data.diningCrew}</p>
            <p><strong>Other Crew:</strong> ${data.otherCrew}</p>
            <p><strong>Registry:</strong> ${data.registry}</p>
            <p><strong>Ship Type:</strong> ${data.shipType}</p>`;
    }

    function generateListHtml(items) {
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    function generateItineraryHtml(itinerary) {
        return itinerary.map(day => `
            <div>
                <h4>Day ${day.day}: ${day.port}</h4>
                <p>Arrival: ${day.arrivalTime}, Departure: ${day.departureTime}</p>
            </div>
        `).join('');
    }

    function generateDateAvailabilityHtml(dates) {
        return dates.map(date => `
            <tr>
                <th scope="row">${date.date}</th>
                <td>${date.inside}</td>
                <td>${date.oceanview}</td>
                <td>${date.balcony}</td>
                <td>${date.suite}</td>
            </tr>
        `).join('');
    }

    function generateCabinHtml(cabins) {
        return cabins.map(cabin => `
            <div class="cabin-type">
                <h3>${cabin.type}</h3>
                <p>From: $${cabin.cost}</p>
            </div>
        `).join('');
    }

    // Call the function to fetch cruise details
    fetchCruiseDetails();
});
