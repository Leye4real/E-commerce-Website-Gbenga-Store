import React from 'react';
import ReactDOM from 'react-dom';
import PayPalButtonWrapper from './PayPalButtonWrapper'; // Import your wrapper component

const App = () => {
  const paypalClient = {
    sandbox: 'YOUR_SANDBOX_CLIENT_ID',
    production: 'YOUR_PRODUCTION_CLIENT_ID'
  };
  const currency = 'USD';
  const total = 100;
  
  const onSuccess = payment => {
    console.log('Payment successful:', payment);
  };

  const onCancel = data => {
    console.log('Payment cancelled:', data);
  };

  return (
    <div>
      {/* Use your wrapper component */}
      <PayPalButtonWrapper
        client={paypalClient}
        currency={currency}
        total={total}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
