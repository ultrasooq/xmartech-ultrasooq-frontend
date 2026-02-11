"use client";
// Lazy load Stripe - only load when needed
export const loadStripe = async (publishableKey: string) => {
  const stripeModule = await import("@stripe/stripe-js");
  return stripeModule.loadStripe(publishableKey);
};
