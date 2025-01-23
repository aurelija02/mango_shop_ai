### Scopes description

* `{API-type}` - specifies partner role used to connect to API. Supported values `PSD2` or `PARTNER`;
* `{API-type}account_list` - this scope is needed in case TPP needs customer list of accounts. If such scope is requested by TPP and granted by user through authentication (login process) allAccounts consent is returned automatically valid;
* `{API-type}account_balances` - this scope is needed in case TPP needs customer account balances. If such scope is requested by TPP and granted by user through authentication (login process), detailed consent with balances request is returned automatically valid;
* `{API-type}account_transactions` - this scope is needed in case TPP needs customer account transaction list/statement. If such scope is requested by TPP and granted by user through authentication (login process), detailed consent with transactions request is returned automatically valid;
* `{API-type}account_transactions_over90` - this scope is needed in case TPP wants to get transactions over 90 days without SCA once per new user authorisation. It grants access to transactions over 90 days data to selected accounts for one hour after consent's creation.
