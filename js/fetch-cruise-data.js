$(document).ready(function() {
    const baseUrl = 'http://rest.api.cruisehost.net';
    const apiToken = '100|rpwdRN5Ay3zjLuwmlLO8TjTSUuYfpmlzxsD8r97y';

    // Function to fetch cruise data from the API
    function fetchCruiseData() {
        $.ajax({
            url: baseUrl + '/cruises',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + apiToken,
                'Content-Type': 'application/json'
            },
            success: function(data) {
                // Call to update the page with new cruise data
                updateCruiseDetails(data);
            },
            error: function(error) {
                console.log('Error fetching cruise data:', error);
            }
        });
    }

    // Function to update the cruise details on the page
    function updateCruiseDetails(data) {
        // Check if data is valid and has cruises
        if (!data || !data.cruises) {
            console.log('No cruise data available');
            return;
        }

        // Generate HTML for each cruise
        var cruiseListHtml = '';
        data.cruises.forEach(function(cruise) {
            cruiseListHtml += createCruiseCard(cruise);
        });

        // Update the HTML of the cruise-list element
        $('#cruise-list').html(cruiseListHtml);
    }

    // Function to create HTML card for a single cruise
    function createCruiseCard(cruise) {
        return `
            <div class="col-lg-6 responsive-column">
                <div class="card-item cruise--card">
                    <div class="card-img">
                        <a href="cruise-details.html" class="d-block">
                            <img src="${cruise.imageUrl}" alt="cruise-img">
                            <span class="badge">${cruise.status}</span>
                        </a>
                    </div>
                    <div class="card-body">
                        <img src="${cruise.companyLogoUrl}" alt="" class="cruise-logo">
                        <h3 class="card-title"><a href="cruise-details.html">${cruise.title}</a></h3>
                        <p class="card-meta">Departing ${cruise.departureCity}</p>
                        <div class="card-rating">
                            <span class="badge text-white">${cruise.rating}/5</span>
                            <span class="review__text">${cruise.reviewLabel}</span>
                            <span class="rating__text">(${cruise.reviewCount} Reviews)</span>
                        </div>
                        <div class="card-price d-flex align-items-center justify-content-between">
                            <p>
                                <span class="price__from">From</span>
                                <span class="price__num">$${cruise.price}</span>
                            </p>
                            <a href="cruise-details.html" class="btn-text">Read details<i class="la la-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initial call to fetch cruise data when the document is ready
    fetchCruiseData();
});
