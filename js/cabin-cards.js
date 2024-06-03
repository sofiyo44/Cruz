document.addEventListener('DOMContentLoaded', function () {
    const cabinData = {
        "IS": {
            "id": "IS",
            "text": "Inside cabin",
            "cat": "1A",
            "price": "$760",
            "price_touroperator": 722,
            "availability": "yes",
            "cabins": "",
            "selected": false,
            "pricebreakdown": null,
            "img": "//images.cruisec.net/images/ships/cabins/V5_IS.jpg",
            "children": [
                {
                    "id": "1A",
                    "text": "Category: 1A - 2 bed Interior stateroom",
                    "cat": "",
                    "price": "$760",
                    "price_touroperator": 722,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
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
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "IS",
                    "text": "Category: IS - 2 bed Interior stateroom Guarantee",
                    "cat": "",
                    "price": "$810",
                    "price_touroperator": 770,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 17 m²",
                        "2 single beds that can be pushed together",
                        "Partially fold-out upper beds",
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
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "4A",
                    "text": "Category: 4A - 2 bed Interior stateroom",
                    "cat": "",
                    "price": "$819",
                    "price_touroperator": 779,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Double bed or 2 single beds",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                }
            ]
        },
        "OS": {
            "id": "OS",
            "text": "Outside cabin",
            "cat": "OV",
            "price": "$1,030",
            "price_touroperator": 979,
            "availability": "yes",
            "cabins": "",
            "selected": false,
            "pricebreakdown": null,
            "img": "//images.cruisec.net/images/ships/cabins/V5_OS.jpg",
            "children": [
                {
                    "id": "OV",
                    "text": "Category: OV - 2 bed Oceanview stateroom Guarantee",
                    "cat": "",
                    "price": "$1,030",
                    "price_touroperator": 979,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Panorama window",
                        "2 single beds that can be pushed together",
                        "Partially fold-out upper beds or sofa bed",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "Bathrobe",
                        "Pool & beach towel",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "6A",
                    "text": "Category: 6A - 2 bed Oceanview stateroom",
                    "cat": "",
                    "price": "$1,096",
                    "price_touroperator": 1042,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Double bed or 2 single beds",
                        "Panorama window",
                        "Couch",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "6B",
                    "text": "Category: 6B - 2 bed Oceanview stateroom",
                    "cat": "",
                    "price": "$1,116",
                    "price_touroperator": 1061,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Double bed or 2 single beds",
                        "Panorama window",
                        "Couch",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                }
            ]
        },
        "BK": {
            "id": "BK",
            "text": "Balcony cabin",
            "cat": "BL",
            "price": "$1,336",
            "price_touroperator": 1270,
            "availability": "yes",
            "cabins": "",
            "selected": false,
            "pricebreakdown": null,
            "img": "//images.cruisec.net/images/ships/cabins/V5_BK.jpg",
            "children": [
                {
                    "id": "BL",
                    "text": "Category: BL - 2 bed Oceanview stateroom with balcony Guarantee",
                    "cat": "",
                    "price": "$1,336",
                    "price_touroperator": 1270,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Balcony with seating furniture",
                        "2 single beds that can be pushed together",
                        "Partially fold-out upper beds or sofa bed",
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
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "7C",
                    "text": "Category: 7C - 2 bed Oceanview stateroom with balcony",
                    "cat": "",
                    "price": "$1,353",
                    "price_touroperator": 1286,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 21 m²",
                        "Balcony with seating and wind protection",
                        "2 single beds (can be pushed together)",
                        "room-darkening curtains",
                        "Couch",
                        "Desk",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WiFi reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "8A",
                    "text": "Category: 8A - 2 bed Oceanview stateroom with balcony",
                    "cat": "",
                    "price": "$1,373",
                    "price_touroperator": 1305,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 20 m²",
                        "Double bed or 2 single beds",
                        "Couch",
                        "Bathroom with shower and WC",
                        "Balcony with seating furniture",
                        "large window",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "own minibar"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                }
            ]
        },
        "MS": {
            "id": "MS",
            "text": "Mini Suite",
            "cat": "JS",
            "price": "$2,895",
            "price_touroperator": 2753,
            "availability": "yes",
            "cabins": "",
            "selected": false,
            "pricebreakdown": null,
            "img": "//images.cruisec.net/images/ships/cabins/V5_MS.jpg",
            "children": [
                {
                    "id": "JS",
                    "text": "Category: JS - Juniorsuite",
                    "cat": "",
                    "price": "$2,895",
                    "price_touroperator": 2753,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 28 m²",
                        "Balcony with approx. 3 m²",
                        "Double bed or 2 single beds",
                        "fold-out sofa bed",
                        "large dressing table",
                        "Bathroom with shower, WC and whirlpool",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "Refrigerator",
                        "VIP status at check-in"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "OS",
                    "text": "Category: OS - Ocean Suite",
                    "cat": "",
                    "price": "$2,907",
                    "price_touroperator": 2764,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 32 m²",
                        "Balcony with approx. 3 m²",
                        "Double bed or 2 single beds",
                        "fold-out sofa bed",
                        "large dressing table",
                        "Bathroom with shower, WC and whirlpool",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "Refrigerator",
                        "VIP status at check-in"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                }
            ]
        },
        "SU": {
            "id": "SU",
            "text": "Suite",
            "cat": "FS",
            "price": "$3,006",
            "price_touroperator": 2858,
            "availability": "yes",
            "cabins": "",
            "selected": false,
            "pricebreakdown": null,
            "img": "//images.cruisec.net/images/ships/cabins/V5_SU.jpg",
            "children": [
                {
                    "id": "FS",
                    "text": "Category: FS Suite for families",
                    "cat": "",
                    "price": "$3,006",
                    "price_touroperator": 2858,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 32 m²",
                        "located in the family area on deck 2",
                        "spacious and roomy for up to 5 people<b>- single beds can be pushed together",
                        "separate seating and entertainment area",
                        "Writing desk",
                        "Bathroom with shower and WC",
                        "Telephone",
                        "Air conditioning",
                        "Television",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "220-volt sockets",
                        "private minibar",
                        "free access to the Family Harbour Lounge",
                        "Babysitting included for 1 night"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "SS",
                    "text": "Category: SS - Spa Suite",
                    "cat": "",
                    "price": "$3,437",
                    "price_touroperator": 3268,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 28 m²",
                        "Double bed or 2 single beds",
                        "Bathroom with shower and WC",
                        "Priority at check-in",
                        "Balcony with approx. 3 m²",
                        "Private access to the spa area",
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
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                },
                {
                    "id": "GS",
                    "text": "Category: GS - Grand Suite",
                    "cat": "",
                    "price": "$4,390",
                    "price_touroperator": 4174,
                    "availability": "yes",
                    "cabins": "yes",
                    "selected": false,
                    "pricebreakdown": null,
                    "description": [
                        "Size approx. 37-40 m²",
                        "Balcony with approx. 7 m² and seating furniture",
                        "2 single beds, convertible into a king-size bed",
                        "fold-out double sofa bed",
                        "Bathroom with shower and WC",
                        "Separate seating area",
                        "Whirlpool bath",
                        "Walk-in wardrobe",
                        "Cosmetic table",
                        "Air conditioning",
                        "Television",
                        "Telephone",
                        "WI-FI reception",
                        "Safe",
                        "Hairdryer",
                        "Bathrobe",
                        "Pool & beach towel",
                        "220-volt sockets",
                        "private minibar",
                        "VIP status at check-in"
                    ],
                    "img": "https://images.cruisec.net/images/ships/cabins/no_image.jpg"
                }
            ]
        }
    };


    let totalPrice = 0;

    const updateTotalPrice = (amount) => {
        totalPrice += amount;
        document.getElementById('booking-sub-total').textContent = `Sub Total: $${totalPrice.toFixed(2)}`;
        document.getElementById('booking-total-price').textContent = `Total Price: $${(totalPrice + 5).toFixed(2)}`; // Assuming Taxes and Fees is $5
        saveTotalPrice(totalPrice);
    };

    const saveTotalPrice = (total) => {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData')) || {};
        formData.totalPrice = total;
        localStorage.setItem('cruiseFormData', JSON.stringify(formData));
    };

    const showParentImage = (parent) => {
        const parentImageContainer = document.getElementById('parent-image');
        parentImageContainer.innerHTML = `
            <img src="${parent.img}" alt="${parent.text}" class="img-fluid" style="width: 30%; display: block; margin: auto;">
        `;
    };

    const createChildCard = (child, selectable = true, smallFont = false, duplicate = false) => {
        return `
            <div class="col-lg-6 mb-4 selected-cabin-card-container" data-cabin-id="${child.id}">
                <div class="card" style="width: 100%; padding: 1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 10px;">
                    <div class="card-body ${smallFont ? 'small-font' : ''}">
                        <button class="btn btn-sm btn-danger float-right close-cabin-btn" style="border-radius: 50%;">&times;</button>
                        <h5 class="card-title">${child.text}</h5>
                        <div class="card-text toggle-content" style="display: none;">
                            <p>Price: ${child.price}</p>
                            <p>Availability: ${child.availability}</p>
                            <ul style="font-size: 0.9em;">
                                ${child.description.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        ${selectable ? `<button class="btn btn-primary select-cabin-btn" data-cabin-id="${child.id}">Select</button>` : '<button class="btn btn-secondary toggle-btn">More Info</button>'}
                    </div>
                </div>
            </div>
        `;
    };

    const populateChildCards = (parent) => {
        const cabinCardsContainer = document.getElementById('cabin-cards');
        cabinCardsContainer.innerHTML = parent.children.map(child => createChildCard(child)).join('');
    };

    const populateCabinChips = () => {
        const cabinChipsContainer = document.getElementById('cabin-chips');
        cabinChipsContainer.style.display = 'flex';
        cabinChipsContainer.style.justifyContent = 'center';
        cabinChipsContainer.style.flexWrap = 'wrap';
        cabinChipsContainer.innerHTML = Object.keys(cabinData).map(key => {
            const cabin = cabinData[key];
            return `
                <button class="btn btn-outline-primary m-1 cabin-chip" style="border-radius: 20px; padding: 0.5rem 1rem;" data-cabin-id="${cabin.id}">${cabin.text}</button>
            `;
        }).join('');
    };

    const updateBreadcrumb = () => {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData'));
        if (formData) {
            document.getElementById('breadcrumb-list').innerHTML = `
                <li class="list-inline-item">Guests: ${formData.numberOfGuests}</li>
                <li class="list-inline-item">Ages: ${formData.ages.join(', ')}</li>
                <li class="list-inline-item">Residency: ${formData.guestResidency}</li>
                <li class="list-inline-item">State: ${formData.guestState}</li>
            `;
        }
    };

    const highlightSelectedChip = () => {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData'));
        if (formData && formData.cabinType) {
            const selectedCabin = cabinData[formData.cabinType];
            if (selectedCabin) {
                showParentImage(selectedCabin);
                populateChildCards(selectedCabin);
                const chips = document.querySelectorAll('.cabin-chip');
                chips.forEach(chip => chip.classList.remove('active'));
                const selectedChip = document.querySelector(`.cabin-chip[data-cabin-id="${formData.cabinType}"]`);
                if (selectedChip) {
                    selectedChip.classList.add('active');
                }
            }
        }
    };

    const addSelectedCabinToBookingDetails = (child) => {
        const bookingDetailsContainer = document.getElementById('selected-cabin-card');
        bookingDetailsContainer.innerHTML += createChildCard(child, false, true);
        const price = parseFloat(child.price.replace('$', ''));
        updateTotalPrice(price);
    };

    const handleToggleContent = (e) => {
        const cardBody = e.target.closest('.card-body');
        const content = cardBody.querySelector('.toggle-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        e.target.textContent = content.style.display === 'none' ? 'More Info' : 'Less Info';
    };

    const handleCloseCard = (e) => {
        const cardContainer = e.target.closest('.selected-cabin-card-container');
        const cabinId = cardContainer.getAttribute('data-cabin-id');
        const cardButton = document.querySelector(`.select-cabin-btn[data-cabin-id="${cabinId}"]`);
        if (cardButton) {
            cardButton.textContent = 'Select';
            const selectedCabinKey = Object.keys(cabinData).find(key =>
                cabinData[key].children.some(child => child.id === cabinId)
            );
            const selectedChild = cabinData[selectedCabinKey].children.find(child => child.id === cabinId);
            selectedChild.selected = false;
            const price = parseFloat(selectedChild.price.replace('$', ''));
            updateTotalPrice(-price);
        }
        cardContainer.remove();
    };

    document.getElementById('select-room-btn').addEventListener('click', function () {
        updateBreadcrumb();
        highlightSelectedChip();
        $('#bookingModal').modal('show');
    });

    document.getElementById('cabin-chips').addEventListener('click', function (e) {
        if (e.target.classList.contains('cabin-chip')) {
            const cabinId = e.target.getAttribute('data-cabin-id');
            const selectedCabin = cabinData[cabinId];
            showParentImage(selectedCabin);
            populateChildCards(selectedCabin);
            const chips = document.querySelectorAll('.cabin-chip');
            chips.forEach(chip => chip.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    document.getElementById('cabin-cards').addEventListener('click', function (e) {
        if (e.target.classList.contains('select-cabin-btn')) {
            const selectedCabinId = e.target.getAttribute('data-cabin-id');
            const selectedCabinKey = Object.keys(cabinData).find(key =>
                cabinData[key].children.some(child => child.id === selectedCabinId)
            );
            const selectedChild = cabinData[selectedCabinKey].children.find(child => child.id === selectedCabinId);

            if (!selectedChild.selected) {
                e.target.textContent = 'Selected';
                e.target.disabled = true;
                selectedChild.selected = true;
                addSelectedCabinToBookingDetails(selectedChild, true);

                const formData = JSON.parse(localStorage.getItem('cruiseFormData')) || {};
                formData.cabinType = selectedCabinKey;
                formData.selectedCabins = formData.selectedCabins || {};
                formData.selectedCabins[selectedCabinId] = selectedCabinId;
                localStorage.setItem('cruiseFormData', JSON.stringify(formData));
            }
        }
    });

    document.getElementById('selected-cabin-card').addEventListener('click', function (e) {
        if (e.target.classList.contains('toggle-btn')) {
            handleToggleContent(e);
        } else if (e.target.classList.contains('close-cabin-btn')) {
            handleCloseCard(e);
            const cabinId = e.target.closest('.selected-cabin-card-container').getAttribute('data-cabin-id');
            const formData = JSON.parse(localStorage.getItem('cruiseFormData')) || {};
            delete formData.selectedCabins[cabinId];
            localStorage.setItem('cruiseFormData', JSON.stringify(formData));
            const cardButton = document.querySelector(`.select-cabin-btn[data-cabin-id="${cabinId}"]`);
            if (cardButton) {
                cardButton.textContent = 'Select';
                cardButton.disabled = false;
            }
        }
    });

    // Initial setup
    populateCabinChips();
    $('#bookingModal').on('shown.bs.modal', function () {
        updateBreadcrumb();
        highlightSelectedChip();
    });
});
