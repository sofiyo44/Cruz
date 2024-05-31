document.addEventListener('DOMContentLoaded', function () {
    const cabinData = {
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

    const createChipButton = (id, text) => {
        return `<button class="btn btn-outline-secondary m-1 cabin-chip" data-cabin-type="${id}">${text}</button>`;
    };

    const createChildCard = (child) => {
        return `
        <div class="col-md-4 mb-4">
            <div class="card child-cabin" data-cabin-id="${child.id}">
                <div class="card-body">
                    <h5 class="card-title">${child.text}</h5>
                    <p class="card-text">Price: ${child.price}</p>
                    <p class="card-text">Availability: ${child.availability}</p>
                    <ul class="card-text small">
                        ${child.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary select-cabin-btn">Select</button>
                </div>
            </div>
        </div>`;
    };

    const populateCabinChips = () => {
        const cabinChipsContainer = document.getElementById('cabin-chips');
        let cabinChipsHTML = '';
        Object.keys(cabinData).forEach(key => {
            const cabin = cabinData[key];
            cabinChipsHTML += createChipButton(cabin.id, cabin.text);
        });
        cabinChipsContainer.innerHTML = cabinChipsHTML;
    };

    const populateChildCards = (cabinType) => {
        const cabinCardsContainer = document.getElementById('cabin-cards');
        let childCardsHTML = '';
        cabinData[cabinType].children.forEach(child => {
            childCardsHTML += createChildCard(child);
        });
        cabinCardsContainer.innerHTML = childCardsHTML;

        // Add event listeners to the "Select" buttons
        document.querySelectorAll('.select-cabin-btn').forEach(button => {
            button.addEventListener('click', function () {
                document.querySelectorAll('.select-cabin-btn').forEach(btn => btn.textContent = 'Select');
                button.textContent = 'Selected';
            });
        });
    };

    const showParentImage = (cabinType) => {
        const parentImageContainer = document.getElementById('parent-image-container');
        parentImageContainer.innerHTML = `<img src="${cabinData[cabinType].img}" class="img-fluid" alt="${cabinData[cabinType].text}">`;
    };

    // Initial population of cabin chips
    populateCabinChips();

    // Event listeners for chip buttons
    document.querySelectorAll('.cabin-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            document.querySelectorAll('.cabin-chip').forEach(chip => chip.classList.remove('active'));
            chip.classList.add('active');
            const cabinType = chip.getAttribute('data-cabin-type');
            showParentImage(cabinType);
            populateChildCards(cabinType);
        });
    });

    // Function to generate breadcrumb
    const generateBreadcrumb = () => {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData'));
        if (!formData) return '';

        const { numberOfGuests, guestResidency, guestState, ages } = formData;

        return `
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Cruise Details</a></li>
                    <li class="breadcrumb-item"><a href="#">Cabin Selection</a></li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Guests: ${numberOfGuests}, Residency: ${guestResidency}, State: ${guestState}, Ages: ${ages.join(', ')}
                    </li>
                </ol>
            </nav>`;
    };

    // Populate the breadcrumb
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    breadcrumbContainer.innerHTML = generateBreadcrumb();
});
