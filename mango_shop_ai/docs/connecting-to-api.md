# Connecting to API !heading

## Connection overview

There are different ways to use API depending on country:

* Use BIC as a request parameter;
* Use Country based DNS. BIC is optional; **Recommended**
* Use Country specific URL. BIC is optional.

In the table below is information about country specific BIC, DNS and URL:

| **Swedbank Country** | **BIC Sandbox** | **BIC Production** | **Country based DNS** | **Country based URL** |
| --- | --- | --- | --- | --- |
| Sweden | SANDSESS | SWEDSESS | - | https://se.psd2.api.swedbank.com |
| Lithuania | SANDLT22 | HABALT22 | https://psd2.api.swedbank.lt | https://lt.psd2.api.swedbank.com |
| Latvia | SANDLV22 | HABALV22 | https://psd2.api.swedbank.lv | https://lv.psd2.api.swedbank.com |
| Estonia | SANDEE2X | HABAEE2X | https://psd2.api.swedbank.ee | https://ee.psd2.api.swedbank.com |
| Cooperating Savings Banks Sweden | SANDSESS | SWEDSESS | - | https://se.psd2.api.swedbank.com |

>we recommend to use provided country based URL as a fallback in case of network related errors (SSL, no response, timeouts).

## API liveness check

Whether PSD2 API is up or not `{api version}/ping` endpoint should be used. It's a lightweight endpoint that responds if PSD2 API is up. In case it's not responding, it can be safely assumed that the rest of the endpoints and API itself aren't going to work too. Please refer to Swagger for more details of its usage.

## API types

There are two different API types under Swedbank API: PSD2 and PARTNER. PARTNER API extends PSD2 functionality and has some differences requested by partner TPPs.
Through out the documentation API type is described as `{API-type}` variable and should be replaced by corresponding API type PSD2 or PARTNER (e.g. `{API-type}sandbox` scope should be replaced with `PSD2sandbox`).

>For Sandbox use PSD2 API only.  

To be able to use and connect to the API TPP must fulfill these steps:

* [Onboard to the Open Banking portal](#tpp-onboarding-on-developer-portal);
* [Register application for Sandbox usage](#tpp-application-registration);
* [Register application for Production usage](#tpp-application-registration);
* [Setup OAuth2.0](#configuring-oauth20-flow-for-tpp);
* [Setup connection identification and security](#identification-and-connection-security).

## TPP onboarding on Developer portal

Onboard in the [Open Banking portal][developer-portal-registration] by providing correct email. Please provide correct organisation name as it is used in communication with customer. After few minutes email with link to further steps will arrive. Please keep username and follow best practices for password creation and management. Unauthorised use of this account may cause damage.

## TPP application registration

* In Open Banking portal create an application. OAuth 2.0 standard parameters must be specified during application creation. TPP must use **different applications** for Sandbox and Production environment:
  * Add a `callback_url` - application URL where access code from OAuth 2.0 protocol is returned;
  * Set type to `confidential`;
  * Obtain a `client_id` - used in OAuth 2.0 protocol;
  * Obtain a `client_secret` - used in OAuth 2.0 protocol;
* Assign needed APIs to application.

>Please note that provided application name will be used in communication with customer and will be visible to customer in different API flows.

## Configuring OAuth2.0 flow for TPP

Some API endpoints do not require customer identification (login) or approval (signing) - in such cases OAuth2.0 token is not needed and configuration can be skipped.

TPP must register `redirect_uri` (link must support https protocol) for OAuth 2.0 flow in Open Bank portal. After a user successfully authorises in the bank, the authorisation server redirects the user back to the TPP application with authorisation code in the URI. Redirect URI must be on secure server (HTTPS) as OAuth2 flow sends sensitive data to it. When authorization is requested, the authorisation server validates a redirection URI to ensure the URI in the request matches the registered one. So, the call-back URI that is registered in the application must match the `redirect_uri` that is passed as query parameter.

In the Auth tab `client_secret` (`shared_secret`) is available. This is private information that should be kept safe; if it is lost it can potentially be used in malicious ways. It should NEVER EVER be placed in your frontend; it is used in backend communication ONLY. If needed `client_secret` can be regenerated.


## Certificates registration and renewal

In developer portal TPP can register or renew needed certificates. More information can be found in developer portal or in the following endpoint: https://psd2.api.swedbank.com/support/v1/qa


## Sandbox usage

The API's Sandbox consists of **static mocked data** needed for preliminary testing:

* Account Information Services (**AIS**) for Sweden and Baltics as defined by article 67 in the PSD2 Directive;
* Payment Initiation services (**PIS**) for Sweden and Baltics as defined by Article 66 in the PSD2 Directive;
* Confirmation on the availability of funds (**CoF**) for Sweden and Baltics as defined by Article 65 in the PSD2 Directive;
* Security and consent services (**SEC**) to create consent and request an OAuth 2.0 token.

It was created in Swedbank Open Banking initiative to support more detailed technical understanding and API’s testing.
Sandbox usage comparing to API's has following differences: 

* BIC (check [connection overview][connection-overview] table);
* API prefix in some requests: `/sandbox/{version}/accounts`;
* OAuth 2.0 requested scope: scope=`{API-type}sandbox`.

Sandbox can be used with dummy token or OAuth 2.0 authentication with fake data can be used. If QWAC or QSEAL certificates are provided Sandbox does validation of signature and mutual TLS.

>Please note that in Sandbox OAuth 2.0 protocol is implemented, but in case you do not want to go through all the process in Authorization header - you may use hardcoded value – `Authorization: Bearer dummyToken`.

More details (including supported error scenarios) on Sandbox usage are provided in [sandbox-setup] chapter.

## Production usage

For Production usage:

* BIC (check [connection overview][connection-overview] table);
* API Prefix in some requests: `{API-type}/{version}/accounts`;
* OAuth 2.0 requested scope: scope=`{API-type}`.

Production usage is allowed only for TPPs which are licensed or have agreement with Swedbank.

For Production usage TPP must register public parts of TLS (QWAC) and signing (QSEAL) certificates in the [Open Banking portal][developer-portal]. These certificates are validated using OCSP and used for mutual TLS and verification of requests signatures. To streamline the process feel free to [contact us][contacting-us].

It is strongly advised to perform API smoke test in production before opening it for wide usage. We encourage providing feedback in case of some unclarified places or some improvements are needed by [contacting us][contacting-us].

>Please note that application name and organization name is visible to a user and should be correct. TPP must use different applications (app-id’s) for sandbox and production environment.

## TPP name and Application name change

Changes in TPP name can be made by [contacting us][contacting-us].

Changes in Application name can be made in [Developer portal][developer-portal]. For Baltics, application name change has to be requested by contacting us after the name has been updated in developer portal. In Sweden, updating in developer portal is enough. Please be informed that long TPP name can be shortened in labels on devices for authentication/authorization due to technical device limitations.
 
