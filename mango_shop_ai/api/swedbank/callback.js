export default async function handler(req, res) {
  try {
    // Log incoming request details (for development)
    console.log('Received callback:', {
      query: req.query,
      method: req.method
    });

    // Get authorization code and state from Swedbank
    const { code, state } = req.query;

    // Validate state to prevent CSRF attacks
    const savedState = sessionStorage.getItem('swedbank_state');
    if (state !== savedState) {
      throw new Error('Invalid state parameter');
    }

    if (!code) {
      throw new Error('No authorization code received');
    }

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

    // Store the access token (you might want to store this in a secure way)
    // For sandbox testing, we'll just log it
    console.log('Access token received:', tokenData.access_token);

    // Clear the state from storage
    sessionStorage.removeItem('swedbank_state');

    // Redirect to success page
    res.redirect(307, '/checkout/success');
  } catch (error) {
    console.error('Callback error:', error);
    res.redirect(307, '/checkout/error?message=' + encodeURIComponent(error.message));
  }
} 