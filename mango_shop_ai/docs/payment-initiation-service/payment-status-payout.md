# Payment status

In this section, payment (transaction) life cycle is described and available states and transitions of the payment are provided. The transaction status is filled with ISO 20022 codes.

**Status descriptions**

* `ACTC` - AcceptedTechnicalValidation. Payment has been initiated successfully, meaning that authentication and syntactical and semantic validation are successful.

* `ACSC` - AcceptedSettlementCompleted. Authentication, syntactical and semantical validation is successful.
Payment has been successfully processed and debited, meaning that settlement on the debtor's account has been completed. This is a final status.

> There are very special cases when payment status ACSC may change (after account debiting, payment can be stopped by some AML and fraud prevention procedures, errors detection by clearing or accepting bank).
> Final confirmation may be acquired only by checking payment acceptance in creditor account statement as account crediting is done by receiving bank and not controlled by debiting bank.

* `ACSP` - AcceptedSettlementInProcess. The settlement routine regarding the debtor account of the payment has already been initiated and prepared for account debiting. All preceding checks, such as technical validation and customer profile, were successful, but debtor account is not debited yet. Usually it is related with nuances of payment processing or payment was not debited before cut-off time and trading room,
therefore the payment initiation has been accepted for execution. Payment processing is being put on hold and is going to be processed once trading room or other preconditions are available again. In some cases immediate payment gets this status after cut-off time when account is debited. Such payment can be still cancelled by TPP while it is in status ACSP.

* `RJCT` - Rejected. Payment initiation has been rejected. This is a final status.

* `CANC` - Canceled. Payment initiation has been canceled before or during execution. This is a final status.

> Please note, that if payment is in final status (RJCT, CANC, ACSC), it can't be transitioned to another status. This means that Partner should stop calling API to get the payment status.