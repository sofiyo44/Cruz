const express = require('express');
const stripe = require('stripe')('sk_test_51PHWHV09WcoQiYp2LY3F4iWLOiYKIpSNMNK0QPt58EIhgKcPC6xQucuZT7Dkeii1VTo0I0V9YKkoJUJHVah1MGG200JwErUvLp');
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000, // $10.00
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post('/create-setup-intent', async (req, res) => {
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: setupIntent.client_secret,
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
