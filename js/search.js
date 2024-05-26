document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.theme-btn').addEventListener('click', function (e) {
        e.preventDefault();

        // Capture form values
        const destination = document.querySelector('select[name="destination"]').value;
        const departure = document.querySelector('input[name="departure-start"]').value;
        const arrival = document.querySelector('input[name="departure-end"]').value;
        const adult_number = document.querySelector('input[name="adult-number"]').value;
        const child_number = document.querySelector('input[name="child-number"]').value;
        const senior_number = document.querySelector('input[name="senior-number"]').value;
        const sea = document.querySelector('select[name="cruise-type"]').value;
        const cruiseline = document.querySelector('select[name="cruise-line"]').value;
        const ship = document.querySelector('select[name="ship"]').value;
        const duration = document.querySelector('select[name="duration"]').value;
        const package = document.querySelector('select[name="package"]').value;

        // Build query string
        const query = new URLSearchParams({
            area: destination,
            departure,
            arrival,
            adult_number,
            child_number,
            senior_number,
            sea,
            cruiseline,
            ship,
            duration,
            package
        }).toString();

        // Redirect to cruise-list.html with query parameters
        window.location.href = `cruise-list.html?${query}`;
    });
});
