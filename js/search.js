document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
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

      // Redirect to the results page
      window.location.href = 'cruises-list.html';
    })
    .catch(error => console.error('Error:', error));
  });
});
