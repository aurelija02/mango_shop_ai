## Debtor account selection

Payments can be initiated without debtor account details provided in a request. In such case, customer would be able to select desired account on Bank's UI. However, such payments have some limitations:

* It's applicable in Redirect approach only;
* SE specific: account selection is not supported for international payments and basket payments.

After successful payment's execution selected debtor account is set on payments object. If needed, `GET /payment/{paymentId}` endpoint can be called to get it.
Please refer to Swagger for more information.