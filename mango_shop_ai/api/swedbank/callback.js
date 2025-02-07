export default async function handler(req, res) {
  try {
    console.log('Starting callback handler...');
    console.log('Query params:', req.query);

    const { code } = req.query;

    if (!code) {
      throw new Error('No authorization code received');
    }

    console.log('Got authorization code:', code);
    // Exchange code for token (using v5 and psd2 path)
    const tokenResponse = await fetch('https://psd2.api.swedbank.com/psd2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.SWEDBANK_CLIENT_ID,
        client_secret: process.env.SWEDBANK_CLIENT_SECRET,
        code: code,
        redirect_uri: 'https://mango-tango-shop.vercel.app/api/swedbank/callback'
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.tppMessages?.[0]?.text || 'Failed to exchange token');
    }

    console.log('Initiating payment...');
    
    // Make sure to await the payment response
    // Initiate SEPA payment with app-id as query parameter
    const paymentResponse = await fetch(`https://psd2.api.swedbank.lt/sandbox/v5/payments/sepa-credit-transfers?app-id=${process.env.SWEDBANK_CLIENT_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummyToken',
        'X-Request-ID': crypto.randomUUID(),
        'PSU-IP-Address': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        'PSU-User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Date': new Date().toUTCString(),
        'bic': 'SANDLT22',
        'TPP-Redirect-URI': 'https://mango-tango-shop.vercel.app/checkout/success',
        'TPP-Nok-Redirect-URI': 'https://mango-tango-shop.vercel.app/checkout/error',
        'TPP-Redirect-Preferred': 'true'  // Explicitly request redirect approach
      },
      body: JSON.stringify({
        debtorAccount: {
          iban: "LT647189999999999999" // Sandbox test account
        },
        instructedAmount: {
          currency: "EUR",
          amount: "10.00" // Get this from your cart total
        },
        creditorAccount: {
          iban: "LT647189999999990099" // Your merchant account
        },
        creditorName: "Mango Shop",
        remittanceInformationUnstructured: "Payment for order"
      })
    });

    console.log('Payment response status:', paymentResponse.status);
    
    // Make sure to await the JSON parsing
    const paymentData = await paymentResponse.json();
    console.log('Payment data:', paymentData);

    if (!paymentResponse.ok) {
      const errorMessage = paymentData.tppMessages?.[0]?.text || 'Payment initiation failed';
      throw new Error(errorMessage);
    }

    // For redirect approach, we should get scaRedirect link in the response
    if (paymentData._links?.scaRedirect?.href) {
      // Redirect user to bank's authentication page
      res.redirect(307, paymentData._links.scaRedirect.href);
    } else {
      throw new Error('No redirect URL received from bank');
    }

  } catch (error) {
    console.error('Callback error:', error);
    res.redirect(307, '/checkout/error?message=' + encodeURIComponent(error.message));
  }
} 