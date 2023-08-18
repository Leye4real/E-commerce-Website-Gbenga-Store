import React from 'react';
import PayPalExpressCheckout from 'react-paypal-express-checkout';

const PayPalButtonWrapper = ({ client, currency, total, onSuccess, onCancel }) => {
    return (
      <PayPalExpressCheckout
        client={client}
        currency={currency}
        total={total}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  };
  
  export default PayPalButtonWrapper;
  