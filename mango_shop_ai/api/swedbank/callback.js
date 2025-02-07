export default async function handler(req, res) {
  try {
    console.log('Starting callback handler...');
    console.log('Query params:', req.query);
    console.log('Full URL:', req.url);

    const { code, state } = req.query;

    if (!code) {
      throw new Error('No authorization code received');
    }

    if (!state) {
      throw new Error('No state parameter received');
    }

    let stateData;
    try {
      stateData = JSON.parse(decodeURIComponent(state));
    } catch (error) {
      console.error('Failed to parse state:', error);
      throw new Error('Invalid state parameter');
    }

    if (!stateData.amount) {
      throw new Error('No amount specified in state');
    }

    // Format amount to have 2 decimal places
    const formattedAmount = Number(stateData.amount).toFixed(2);

    console.log('Got authorization code:', code);
    console.log('Using amount from state:', formattedAmount);

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
    
    // Initiate SEPA payment with app-id as query parameter
    const paymentResponse = await fetch(`https://psd2.api.swedbank.lt/sandbox/v5/payments/sepa-credit-transfers?bic=SANDLT22&app-id=${process.env.SWEDBANK_CLIENT_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummyToken',
        'X-Request-ID': crypto.randomUUID(),
        'PSU-IP-Address': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        'PSU-User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Date': new Date().toUTCString(),
        'TPP-Redirect-URI': 'https://mango-tango-shop.vercel.app/checkout/success',
        'TPP-Nok-Redirect-URI': 'https://mango-tango-shop.vercel.app/checkout/error',
        'TPP-Redirect-Preferred': 'true'
      },
      body: JSON.stringify({
        endToEndIdentification: crypto.randomUUID().replace(/-/g, '').slice(0, 35), // Max 35 chars
        creditorAccount: {
          iban: "LT647189999999990099"
        },
        creditorName: "Mango Tango Shop",
        creditorAddress: {
          country: "LT",
          townName: "Vilnius"
        },
        instructedAmount: {
          currency: "EUR",
          amount: formattedAmount
        },
        remittanceInformationUnstructured: "Payment for order Mango-Tango-Shop"
      })
    });

    console.log('Payment response status:', paymentResponse.status);
    
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