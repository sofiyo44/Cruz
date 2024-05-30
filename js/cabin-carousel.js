document.addEventListener('DOMContentLoaded', function () {
    const cabinData = {
        "IS": {
            "id": "IS",
            "text": "Inside cabin",
            "cat": "1A",
            "price": "$760",
            "children": [
                {
                    "id": "1A",
                    "text": "Category: 1A - 2 bed Interior stateroom",
                    "price": "$760",
                    "availability": "yes",
                    "img": "//images.cruisec.net/images/ships/cabins/no_image.jpg",
                    "description": [
                        "Size approx. 17 m²",
                        "2 single beds (bunk bed)",
                        "some upper beds can be folded out",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "Bathrobe",
                        "Pool & beach towel",
                        "220-volt sockets",
                        "own minibar"
                    ]
                }
                // Other children entries...
            ]
        },
        // Other parent entries...
    };

    const carouselInner = document.getElementById('carousel-cabin-modal');

    const createCarouselItem = (cabin, index) => {
        const isActive = index === 0 ? 'active' : '';
        const childrenHTML = cabin.children.map(child => `
            <div class="carousel-item ${isActive}">
                <div class="card">
                    <img src="${child.img}" class="card-img-top" alt="${child.text}">
                    <div class="card-body">
                        <h5 class="card-title">${child.text}</h5>
                        <p class="card-text">Price: ${child.price}</p>
                        <p class="card-text">Availability: ${child.availability}</p>
                        <p class="card-text">${child.description.join('<br>')}</p>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="carousel-item ${isActive}">
                <div class="section-header">
                    <h4>${cabin.text} - from ${cabin.price}</h4>
                </div>
                ${childrenHTML}
            </div>
        `;
    };

    const carouselItemsHTML = Object.keys(cabinData).map((key, index) => createCarouselItem(cabinData[key], index)).join('');

    carouselInner.innerHTML = carouselItemsHTML;

    document.getElementById('select-room-btn').addEventListener('click', function () {
        $('#bookingModal').modal('show');
    });
});
