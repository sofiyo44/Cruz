// This is your test publishable API key.
const stripe = Stripe("pk_test_51PHWHV09WcoQiYp2LY3F4iWLOiYKIpSNMNK0QPt58EIhgKcPC6xQucuZT7Dkeii1VTo0I0V9YKkoJUJHVah1MGG200JwErUvLp");

// Create a Checkout Session
async function initializeCheckout() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
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