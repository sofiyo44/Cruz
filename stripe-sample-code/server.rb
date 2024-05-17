require 'stripe'
require 'sinatra'
require 'json'

# This is your test secret API key.
Stripe.api_key = 'sk_test_51PHWHV09WcoQiYp2tBwQxVQrlaWHTubfnsutAcM29zzOJMLDAZqg3qQ3RqRQqr3D3FkJqnFTDN1SQUXIXUBEantb00HbgxT6D0'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'http://localhost:4242'

post '/create-checkout-session' do
  content_type 'application/json'

  # Parse the request body to get the total amount
  data = JSON.parse(request.body.read)
  total_amount = data['totalAmount']

  session = Stripe::Checkout::Session.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Total Amount',
        },
        unit_amount: total_amount.to_i, # Use the total amount from the request (convert to integer for cents)
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: "#{YOUR_DOMAIN}/success.html",
    cancel_url: "#{YOUR_DOMAIN}/cancel.html",
  })

  {clientSecret: session.client_secret}.to_json
end

get '/session-status' do
  session = Stripe::Checkout::Session.retrieve(params[:session_id])

  {status: session.status, customer_email: session.customer_details.email}.to_json
end
