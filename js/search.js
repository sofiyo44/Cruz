document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (value) searchParams.append(key, value);
    }

    // Define the API endpoint and token
    const endpoint = 'http://rest.api.cruisehost.net';
    const token = '100|rpwdRN5Ay3zjLuwmlLO8TjTSUuYfpmlzxsD8r97y';

    // Call the API
    fetch(`${endpoint}/search?${searchParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Store the results in localStorage
      localStorage.setItem('cruiseSearchResults', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
      // Optionally store the error or a flag indicating the error in localStorage
      localStorage.setItem('cruiseSearchError', 'true');
    })
    .finally(() => {
      // Redirect to the results page regardless of the API call outcome
      window.location.href = 'cruises-list.html';
    });
  });
});
