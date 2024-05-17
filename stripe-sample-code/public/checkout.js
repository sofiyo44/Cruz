const stripe = Stripe("pk_test_51PHWHV09WcoQiYp2LY3F4iWLOiYKIpSNMNK0QPt58EIhgKcPC6xQucuZT7Dkeii1VTo0I0V9YKkoJUJHVah1MGG200JwErUvLp");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    // Get the cart total (replace this with your actual method of getting the cart total)
    const cartTotal = getCartTotal();

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: cartTotal
      })
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

// Example function to get cart total (replace with actual implementation)
function getCartTotal() {
  // This is just a placeholder. Replace this with your logic to calculate the cart total.
  return 2000; // Example: $20.00
}

