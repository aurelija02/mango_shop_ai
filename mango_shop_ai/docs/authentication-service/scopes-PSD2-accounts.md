### PSD2 API available scopes

|   scope	|   SWEDSESS	|  HABALT22 	|  HABALV22 	|   HABAEE2X	|
|---	|---	|---	|---	|---	|
|   PSD2	| mandatory  	|  mandatory 	|   mandatory	|   mandatory	|
|   PSD2account_list	| optional   	| optional  	| optional  	|  optional 	|
|  PSD2account_balances 	|   optional	|  not supported 	| optional  	|   not supported	|
|  PSD2account_transactions 	|   optional	|  not supported 	| optional  	|   not supported	|
|  PSD2account_transactions_over90 	|   optional	|  not supported 	| not supported  	|   not supported	|
|  PSD2account_owner 	|   optional	|  not supported 	| not supported  	|   not supported	|

### Samples

To inititate authentication for user TPP should use following request with different `scope` parameter values:

```java
GET	https://psd2.api.swedbank.com/psd2/authorize?bic=SWEDSESS&state=1&client_id=123123132132132&redirect_uri=https%3A%2F%2Fpsd2.TPP.com%2Fafter-auth-callback.html&response_type=code&scope=PSD2
```

### TPP uses API in pure PISP way - account information is not needed (Baltics and Sweden)

* scope=`PSD2`

### TPP having AISP role agreed with customer on sharing account list (Baltics and Sweden)

* scope=`PSD2 PSD2account_list`

### TPP having AISP role agreed with customer on sharing account list and account owner name (Sweden only)

* scope=`PSD2 PSD2account_list PSD2account_owner`

### TPP having AISP role agreed with customer on sharing account list and balances (Latvia and Sweden)

* scope=`PSD2 PSD2account_list PSD2account_balances` 

### TPP having AISP role agreed with customer on sharing account list, balances and transactions (Latvia and Sweden)

* scope=`PSD2 PSD2account_list PSD2account_balances PSD2account_transactions` 
