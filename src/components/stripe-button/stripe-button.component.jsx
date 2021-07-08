import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ total }) => {
  const stripeTotal = total * 100; // Cents for it to work
  const stripeKey =
    "pk_test_51JAngSDeN1K5ToVXcPtT9kU73tuMUcN8Pz3J2W05SpPOUC2pgqyuxN9I1PKDjVbBTrWF3cI07i3k3TgqkdvBeIy100GmKmB41i";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="No3l Codes Store"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${total}`}
      amount={stripeTotal}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={stripeKey}
    />
  );
};

export default StripeButton;
