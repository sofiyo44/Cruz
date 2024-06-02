document.addEventListener('DOMContentLoaded', function () {
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

    const saveFormData = () => {
        const formData = {
            numberOfGuests: document.getElementById('numberOfGuests').value,
            guestResidency: document.getElementById('guestResidency').value,
            ages: Array.from(document.querySelectorAll('.guest-age')).map(ageInput => ageInput.value),
            cabinType: document.getElementById('cabinType').value // Assuming there's a select or input for cabin type
        };
        localStorage.setItem('cruiseFormData', JSON.stringify(formData));
    };

    // Save form data initially
    saveFormData();

    // Handle modal button click
    document.getElementById('select-room-btn').addEventListener('click', function () {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData'));
        if (!formData || !formData.numberOfGuests || !formData.guestResidency || !formData.ages.length || !formData.cabinType) {
            alert('Please fill in all form fields and select a cabin.');
            return;
        }
        $('#bookingModal').modal('show');
    });

    // Steps and Validation JavaScript
    let currentStep = 1;
    const totalSteps = 3;

    const showStep = (step) => {
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById(`step${i}`).classList.toggle('d-none', i !== step);
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    };

    const generatePassengerForm = (numPassengers) => {
        const container = document.getElementById('passenger-info-container');
        container.innerHTML = '';
        for (let i = 0; i < numPassengers; i++) {
            const passengerForm = `
                <div class="passenger-form">
                    <h4>Passenger ${i + 1}</h4>
                    <div class="form-group">
                        <label for="fullName${i}">Full Name</label>
                        <input type="text" class="form-control" id="fullName${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="dob${i}">Date of Birth</label>
                        <input type="date" class="form-control" id="dob${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="nationality${i}">Nationality</label>
                        <input type="text" class="form-control" id="nationality${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="passport${i}">Passport/ID</label>
                        <input type="text" class="form-control" id="passport${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="proofOfID${i}">Proof of Valid ID</label>
                        <input type="file" class="form-control" id="proofOfID${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="specialNeeds${i}">Special Needs/Medical Conditions</label>
                        <input type="text" class="form-control" id="specialNeeds${i}">
                    </div>
                    <div class="form-group">
                        <label for="address${i}">Home/Billing Address</label>
                        <input type="text" class="form-control" id="address${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="phone${i}">Telephone Number(s)</label>
                        <input type="text" class="form-control" id="phone${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="email${i}">Email Address</label>
                        <input type="email" class="form-control" id="email${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="emergencyContact${i}">Emergency Contact</label>
                        <input type="text" class="form-control" id="emergencyContact${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="signature${i}">Signature</label>
                        <input type="text" class="form-control" id="signature${i}" required>
                    </div>
                </div>
            `;
            container.innerHTML += passengerForm;
        }
    };

    const populatePaymentSummary = () => {
        const formData = JSON.parse(localStorage.getItem('cruiseFormData'));
        const paymentSummaryContainer = document.getElementById('payment-summary');
        paymentSummaryContainer.innerHTML = `
            <p>Order Total: <strong>${formData.totalPrice}</strong></p>
            <!-- Add line items here -->
        `;
    };

    document.getElementById('next-step').addEventListener('click', nextStep);
    document.getElementById('prev-step').addEventListener('click', prevStep);

    const getNumberOfPassengersFromSidebar = () => {
        const sidebarPassengerCount = document.querySelector('#sidebar-passenger-count');
        return parseInt(sidebarPassengerCount ? sidebarPassengerCount.value : 1, 10);
    };

    // Retrieve the number of passengers from the sidebar and generate the passenger forms
    const numberOfPassengers = getNumberOfPassengersFromSidebar();
    generatePassengerForm(numberOfPassengers);

    // Initialize Stripe elements for payment
    const stripe = Stripe('your-publishable-key');
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const { token, error } = await stripe.createToken(card);
        if (error) {
            // Handle error
        } else {
            // Handle successful token generation
        }
    });

    // Initial setup
    $('#bookingModal').on('shown.bs.modal', function () {
        updateBreadcrumb();
        highlightSelectedChip();
    });
    showStep(currentStep);
});
