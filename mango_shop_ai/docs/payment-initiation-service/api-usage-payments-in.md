# API usage !heading
Main API usage patterns are described in diagrams bellow.

## Payment initiation flow for first time

1. Login for OAuth2.0 token
2. allAccounts consent
3. Accounts list
4. Detailed consent for account balances
5. Accounts balances
6. Initiate payment

![General scheme for Payment initiation.png](images/General scheme for Payment initiation.png)

## Payment initiation flow with existing token

1. Refresh OAuth2.0 token
2. Accounts balances
3. Initiate payment

![General scheme for Payment initiation 2nd time.png](images/General scheme for Payment initiation 2nd time.png)
