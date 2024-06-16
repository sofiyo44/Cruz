async function searchCruises() {
    const sea = document.querySelector('input[name="sea"]:checked')?.value;
    const packageType = document.querySelector('input[name="package"]:checked')?.value;
    const area = Array.from(document.querySelectorAll('select[name="area"] option:checked')).map(el => el.value);
    const cruiseline = Array.from(document.querySelectorAll('select[name="cruiseline"] option:checked')).map(el => el.value);
    const ship = Array.from(document.querySelectorAll('select[name="ship"] option:checked')).map(el => el.value);
    const duration = Array.from(document.querySelectorAll('input[name="duration"]:checked')).map(el => el.value);
    const departure = document.querySelector('input[name="date"]').value;
    const arrival = document.getElementById('arrival')?.value;

    const query = new URLSearchParams({
        sea,
        package: packageType,
        area,
        cruiseline,
        ship,
        duration,
        departure,
        arrival
    }).toString();

    const response = await fetch(`http://localhost:3000/search?${query}`, {
        headers: {
            'Authorization': 'your-local-auth-token'
        }
    });
    const data = await response.json();
    localStorage.setItem('searchResults', JSON.stringify(data));
    window.location.href = 'cruises-list.html';
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button[onclick="searchCruises()"]').addEventListener('click', function (e) {
        e.preventDefault();
        searchCruises();
    });
});
