document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch cruise details
    function fetchCruiseDetails() {
        fetch('http://rest.api.cruisehost.net', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 100|rpwdRN5Ay3zjLuwmlLO8TjTSUuYfpmlzxsD8r97y',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updatePageContent(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // Function to update page content with fetched data
    function updatePageContent(data) {
        const contentArea = document.getElementById('dynamic-cruise-content');
        if (!contentArea) return;

        // Example of how you might construct HTML with your data
        const descriptionHtml = `
            <div id="description" class="page-scroll">
                <div class="single-content-item pb-4">
                    <h3 class="title font-size-26">${data.name}</h3>
                    <div class="d-flex flex-wrap align-items-center pt-2">
                        <p class="mr-2">${data.location}</p>
                        <p>
                            <span class="badge badge-warning text-white font-size-16">${data.rating}</span>
                            <span>(${data.reviews} Reviews)</span>
                        </p>
                    </div>
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        // Append the new HTML into the content area
        contentArea.innerHTML = descriptionHtml;

        // You can add more sections as needed based on your data structure
    }

    // Call the function to fetch cruise details
    fetchCruiseDetails();
});
