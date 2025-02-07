## Payment cancellation

Call `DELETE /{version}/{payment-service}/{payment-product}/{paymentId}`
to delete the corresponding payment resource. 

PSU authorisation for deletion is not needed.

TPP can cancel initiated or authorised immediate or future dated payment while payment is in status ACTC, PATC, ACSP or ACCP. (In Latvia only - recurring payment before payment execution can be cancelled.)

Payment cancellation process:

1. Initiate payment cancellation by calling  `DELETE /{version}/{payment-service}/{paymentId}`;
2. Check payment status until you get CANC for successfully cancellation performed.
In case payment can't be cancelled - error is returned. More technical details on Developer portal, [API explorer][api-explorer].



