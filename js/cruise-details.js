document.addEventListener('DOMContentLoaded', function() {
    function fetchCruiseDetails() {
        fetch('https://api.cruiseinfo.com/details?cruiseId=XYZ')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cruise-description').innerHTML = `<p>${data.description}</p>`;

            let statsHtml = `
                <p>Date Launched: ${data.dateLaunched}</p>
                <p>Age of Ship: ${data.ageOfShip} years</p>
                <p>Refurbished Date: ${data.refurbishedDate}</p>
                <p>Tonnage: ${data.tonnage} grt</p>
                ...`;
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

            // Populate cabin types and costs
            let cabinHtml = data.cabinTypes.map(cabin => `
                <div class="cabin-type">
                    <h3>${cabin.type}</h3>
                    <p>From: $${cabin.cost}</p>
                </div>
            `).join('');
            document.getElementById('cabin-types').innerHTML = cabinHtml;

            // Populate policies
            document.getElementById('cruise-policies').innerHTML = `<p>${data.policies}</p>`;
        })
        .catch(error => {
            console.error('Failed to load cruise details:', error);
            alert('Failed to fetch cruise details. Please try again later.');
        });
    }

    // Call the function to fetch cruise details
    fetchCruiseDetails();
});
