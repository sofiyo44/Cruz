$(document).ready(function() {
    // Base URL and endpoint for API requests
    const baseUrl = 'http://rest.api.cruisehost.net';
    const apiToken = '100|rpwdRN5Ay3zjLuwmlLO8TjTSUuYfpmlzxsD8r97y'; // Token used here for example purposes

    // Fetching cruise data
    function fetchCruiseData() {
        $.ajax({
            url: baseUrl + '/cruises', // Adjust if the specific endpoint for cruises is different
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + apiToken,
                'Content-Type': 'application/json'
            },
            success: function(data) {
                updateCruiseDetails(data);
            },
            error: function(error) {
                console.log('Error fetching cruise data:', error);
            }
        });
    }

    // Function to update the cruise details on the page
    function updateCruiseDetails(data) {
        if (!data || !data.cruises) {
            console.log('No cruise data available');
            return;
        }

        // Example: Update cruise list dynamically
        var cruiseListHtml = '';
        data.cruises.forEach(function(cruise) {
            cruiseListHtml += '<li>' + cruise.name + ' - ' + cruise.description + '</li>';
        });

        // Assume there's an element with ID 'cruise-list' where we want to display the cruises
        $('#cruise-list').html(cruiseListHtml);
    }

    // Call the function to fetch cruise details when ready
    fetchCruiseData();
});
