import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for celticwellness.ie.",
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms and conditions"
      intro="Last updated 4 June 2025. These terms govern your use of celticwellness.ie, operated by Celtic Wellness LTD, Tenure Business Park, Monasterboice, Drogheda, Co. Louth, A92 NHY5. Questions: info@celticwellness.ie or +353 85 140 7778."
    >
      <InfoSection heading="1. Using this website">
        <p>
          You must be at least 18 years old to make purchases or create an
          account. You agree not to use the site for unlawful activity,
          including fraud or attempts at unauthorised access.
        </p>
      </InfoSection>

      <InfoSection heading="2. Intellectual property">
        <p>
          All content on this site (text, images, logos, trademarks) is owned
          by Celtic Wellness LTD and may not be reproduced without written
          permission.
        </p>
      </InfoSection>

      <InfoSection heading="3. Orders, pricing and payment">
        <p>
          All orders are subject to availability and confirmation of pricing,
          and we reserve the right to cancel an order where necessary. Prices
          are listed in Euros (€) and include VAT where applicable. Payment is
          accepted by credit card, debit card and PayPal through our secure
          checkout.
        </p>
      </InfoSection>

      <InfoSection heading="4. Shipping and risk">
        <p>
          Delivery times are estimates and not guaranteed. Risk in the products
          passes to you on delivery. See our delivery information page for
          costs and timelines.
        </p>
      </InfoSection>

      <InfoSection heading="5. Returns">
        <p>
          You have 14 days from delivery to return unused, unopened products,
          with refunds processed within 14 days of receipt. Full details are on
          our refunds and returns page.
        </p>
      </InfoSection>

      <InfoSection heading="6. Subscriptions and digital services">
        <p>
          Where a subscription service is offered, it may auto-renew unless
          cancelled before the end of the billing cycle.
        </p>
      </InfoSection>

      <InfoSection heading="7. Your account">
        <p>
          You are responsible for keeping your account credentials
          confidential, and for reporting any unauthorised activity on your
          account immediately.
        </p>
      </InfoSection>

      <InfoSection heading="8. Liability">
        <p>
          To the extent permitted by law, Celtic Wellness LTD is not liable for
          indirect, incidental or consequential damages, and our total
          liability is capped at the purchase price of the products concerned.
        </p>
      </InfoSection>

      <InfoSection heading="9. Governing law and disputes">
        <p>
          These terms are governed by Irish law and disputes are resolved in
          the Irish courts. EU consumers may also use the EU Online Dispute
          Resolution platform.
        </p>
      </InfoSection>

      <InfoSection heading="10. Changes to these terms">
        <p>
          We may update these terms from time to time. Continued use of the
          site constitutes acceptance of the revised terms.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
