import Stripe from "stripe";
import { getStripeCheckoutEnv } from "@/lib/env";

let stripeClient: Stripe | undefined;

export function getStripe() {
  if (!stripeClient) {
    const env = getStripeCheckoutEnv();

    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      appInfo: {
        name: "EU Work Support Web",
      },
    });
  }

  return stripeClient;
}
