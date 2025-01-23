## Terms used in OAuth 2.0

| **Definition** | **Description** |
| --- | --- |
| OAuth 2.0 | OAuth 2.0 is an authorisation framework that enables applications to obtain limited access to user accounts on an HTTP service. | 
| OAuth 2.0 flow  | Since the API is built for backend communication and not designed to handle direct client communication it is mandated that the `grant_type` is `authorization_code` and requires the use of a `client_secret` and a `client_id`. | 
| client_secret  | A client secret is obtained by registering in the [Open Banking portal](https://developer.swedbank.com/admin/app/registration) and logging in to create your application. In the **_Auth_** tab there is `client_secret` (`shared_secret`). <br>**This is private information that should be kept very safe; if it is lost it can potentially be used in malicious ways. It should NEVER EVER be placed in your frontend; It is used in backend communication ONLY.**|
| client_id | A `client_id` is obtained by simply registering in the [Open Banking portal](https://developer.swedbank.com/admin/app/registration) and logging in to create TPP application. `client_id` (API Key) can be found in the **_Auth_** tab. |
| redirect_uri  | This is an URI which should be provided to the user after authorization according to OAuth 2.0 is completed, i.e somewhere on the TPP side. |
| scope  | A scope according to OAuth 2.0 defines what data can be accessed. API supported scopes are `PSD2sandbox` in a Sandbox environment or `PSD2` in a production environment. |
| state | In OAuth 2.0 a random string is defined as state. State is provided and verified by Partner or TPP. The main purpose is to avoid cross site request forgery [(CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks. |