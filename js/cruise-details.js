document.addEventListener('DOMContentLoaded', function() {
    function fetchCruiseDetails() {
        fetch('https://api.cruiseinfo.com/details?cruiseId=XYZ')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response issue');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cruise-description').innerHTML = `<p>${data.description}</p>`;

            let statsHtml = `
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
            document.getElementById('ship-statistics').innerHTML = statsHtml;

            document.getElementById('whats-included').innerHTML = `<ul>${data.whatsIncluded.map(item => `<li>${item}</li>`).join('')}</ul>`;

            document.getElementById('ship-amenities').innerHTML = `<ul>${data.amenities.map(amenity => `<li>${amenity}</li>`).join('')}</ul>`;

            let itineraryHtml = data.itinerary.map(day => `
                <div>
                    <h4>Day ${day.day}: ${day.port}</h4>
                    <p>Arrival: ${day.arrivalTime}, Departure: ${day.departureTime}</p>
                </div>
            `).join('');
            document.getElementById('cruise-itinerary').innerHTML = itineraryHtml;

            let dateAvailabilityHtml = data.dateAvailabilities.map(date => `
                <tr>
                    <th scope="row">${date.date}</th>
                    <td>${date.inside}</td>
                    <td>${date.oceanview}</td>
                    <td>${date.balcony}</td>
                    <td>${date.suite}</td>
                </tr>
            `).join('');
            document.getElementById('cruise-date-availability').innerHTML = dateAvailabilityHtml;

            let cabinHtml = data.cabinTypes.map(cabin => `
                <div class="cabin-type">
                    <h3>${cabin.type}</h3>
                    <p>From: $${cabin.cost}</p>
                </div>
            `).join('');
            document.getElementById('cabin-types').innerHTML = cabinHtml;

            document.getElementById('cruise-policies').innerHTML = `<p>${data.policies}</p>`;
        })
        .catch(error => {
            console.error('Failed to load cruise details:', error);
            document.getElementById('cruise-description').innerHTML = `<p>Error loading cruise details. Please check your connection and try again.</p>`;
            alert('Failed to fetch cruise details. Please try again later.');
        });
    }

    // Call the function to fetch cruise details
    fetchCruiseDetails();
});
