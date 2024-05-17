    function updateSubtotal(element) {
        var price = 110.00; // Price of the room
        var quantity = parseInt(element.value); // Get the quantity value
        var subtotal = price * quantity; // Calculate the subtotal
        element.closest('tr').querySelector('.subtotal').innerText = '$' + subtotal.toFixed(2); // Update the subtotal text

        updateTotal(); // Update the total
    }

    function updateTotal() {
        var subtotals = document.querySelectorAll('.subtotal');
        var total = 0;
        subtotals.forEach(function(subtotal) {
            total += parseFloat(subtotal.innerText.replace('$', ''));
        });

        // Reference name for total
        var totalReference = total.toFixed(2);
        // You can use totalReference wherever you need
        console.log("Total: $" + totalReference);

        // Update the hidden input with the total amount in cents
        document.querySelector('#total-amount').value = (total * 100).toFixed(0);
    }

    // This is your test publishable API key.
    const stripe = Stripe("pk_test_51PHWHV09WcoQiYp2LY3F4iWLOiYKIpSNMNK0QPt58EIhgKcPC6xQucuZT7Dkeii1VTo0I0V9YKkoJUJHVah1MGG200JwErUvLp");

    // Create a Checkout Session
    async function initializeCheckout() {
        const fetchClientSecret = async () => {
            const totalAmount = document.querySelector('#total-amount').value; // Get the total amount in cents
            const response = await fetch("/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ totalAmount }) // Send the total amount to the server
            });
            const { clientSecret } = await response.json();
            return clientSecret;
        };

        const checkout = await stripe.initEmbeddedCheckout({
            fetchClientSecret,
        });

        // Mount Checkout
        checkout.mount('#checkout');
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.proceed-to-checkout-btn').addEventListener('click', function (event) {
            event.preventDefault();
            initializeCheckout();
        });
    });
