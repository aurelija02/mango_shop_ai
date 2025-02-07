export default async function handler(req, res) {
  try {
    console.log('Starting callback handler...');
    console.log('Query params:', req.query);
    console.log('Headers:', req.headers);

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
    // Initiate SEPA payment
    const paymentResponse = await fetch('https://psd2.api.swedbank.lt/sandbox/v5/payments/sepa-credit-transfers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummyToken',
        'X-Request-ID': crypto.randomUUID(),
        'PSU-IP-Address': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        'Date': new Date().toUTCString(),
        'bic': 'SANDLT22'
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

    // Check payment status
    const paymentId = paymentData.paymentId;
    const statusResponse = await fetch(
      `https://psd2.api.swedbank.lt/sandbox/v5/payments/sepa-credit-transfers/${paymentId}/status`,
      {
        headers: {
          'Authorization': 'Bearer dummyToken',
          'X-Request-ID': crypto.randomUUID(),
          'bic': 'SANDLT22'
        }
      }
    );

    // Handle different payment statuses
    switch(statusData.transactionStatus) {
      case 'ACTC':
        // Payment initiated successfully
        res.redirect(307, '/checkout/success');
        break;
      case 'ACSC':
        // Payment completed successfully
        res.redirect(307, '/checkout/success');
        break;
      case 'RJCT':
        throw new Error('Payment was rejected');
      case 'CANC':
        throw new Error('Payment was cancelled');
      default:
        throw new Error(`Payment status: ${statusData.transactionStatus}`);
    }
    res.redirect(307, '/checkout/success');

  } catch (error) {
    console.error('Callback error:', error);
    res.redirect(307, '/checkout/error?message=' + encodeURIComponent(error.message));
  }
} 