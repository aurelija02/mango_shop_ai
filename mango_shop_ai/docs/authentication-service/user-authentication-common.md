# User authentication !heading

In Swedbank user connecting to API can act as a private customer or as a representative of a company (legal entity):

- As a private user person has access to customer owned accounts in the Swedbank;
- As a representative of a company user can only access accounts that user has been granted access to. Access rights to accounts are defined in the Internet bank agreement and transparently applied to API.

Swedbank in API implemented pre-OAuth authorisation mode. The token is the identification method that can be used by the TPP to act on behalf of the customer (e.g. to retrieve data without the user's involvement).

It requires an authentication of a user in a pre-step, translating this authentication into an access token. Swedbank API issues OAuth 2.0 access token for unique tuple of bank, user and target customer (account owner). It means that one OAuth 2.0 token represents one user in one bank accessing data for one target private or corporate customer owned accounts.
