// This is your test publishable API key.
const stripe = Stripe("pk_test_51PHWHV09WcoQiYp2LY3F4iWLOiYKIpSNMNK0QPt58EIhgKcPC6xQucuZT7Dkeii1VTo0I0V9YKkoJUJHVah1MGG200JwErUvLp");

// Function to get the cart total
function getCartTotal() {
  // Assuming you have a way to get the total from the cart
  // This is a placeholder example
  const totalElement = document.querySelector('#cart-total');
  return totalElement ? parseFloat(totalElement.textContent.replace('$', '')) * 100 : 0; // Convert to cents
}

// Create a Checkout Session
async function initializeCheckout() {
  const fetchClientSecret = async () => {
    const totalReference = getCartTotal(); // Get the cart total
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ totalReference }) // Send the total to the server
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
