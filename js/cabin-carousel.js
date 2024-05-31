document.addEventListener('DOMContentLoaded', function () {
    const cabinData = {
        "IS": {
            "id": "IS",
            "text": "Inside cabin",
            "img": "//images.cruisec.net/images/ships/cabins/V5_IS.jpg",
            "children": [
                {
                    "id": "1A",
                    "text": "Category: 1A - 2 bed Interior stateroom",
                    "price": "$760",
                    "availability": "yes",
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
                },
                // ... other child cabins ...
            ]
        },
        // ... other parent cabins ...
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
