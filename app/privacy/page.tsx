import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Celtic Wellness collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy policy"
      intro="How Celtic Wellness LTD collects, uses and protects your personal data. Data controller: Celtic Wellness LTD, Tenure Business Park, Monasterboice, Drogheda, Co. Louth, A92 NHY5. Contact: info@celticwellness.ie or +353 85 140 7778."
    >
      <InfoSection heading="What we collect">
        <p>
          Information you give us directly: contact details such as your name,
          email, phone number and address, and payment and transaction details
          when you purchase through our store.
        </p>
        <p>
          Information collected automatically: we use Google Analytics
          (including your IP address, anonymised where possible, and browsing
          patterns) and Microsoft Clarity (mouse movements, clicks and
          scrolling behaviour) to understand how the site is used and improve
          the experience.
        </p>
      </InfoSection>

      <InfoSection heading="How we use it">
        <p>
          To provide and manage our services, such as processing orders and
          customer support; to analyse traffic and marketing effectiveness; to
          send promotional communications, only with your explicit permission;
          and to meet our legal and regulatory obligations.
        </p>
      </InfoSection>

      <InfoSection heading="Cookies">
        <p>
          Cookies help the site function, let us analyse usage trends and
          personalise your experience. You can manage cookie preferences
          through your browser settings.
        </p>
      </InfoSection>

      <InfoSection heading="Who we share data with">
        <p>
          Service providers: Google Analytics, Microsoft Clarity, WooCommerce,
          payment processors (Stripe, PayPal) and hosting providers. Where data
          is transferred outside the EU, protective mechanisms such as Standard
          Contractual Clauses are used.
        </p>
      </InfoSection>

      <InfoSection heading="Your rights">
        <p>
          Under GDPR you can access, correct or delete your data, and withdraw
          consent for marketing at any time. You can also lodge a complaint
          with the Irish Data Protection Commission (DPC).
        </p>
      </InfoSection>

      <InfoSection heading="Contact">
        <p>
          For any data query, email{" "}
          <a
            href="mailto:info@celticwellness.ie"
            className="text-pine-700 underline underline-offset-2 hover:text-pine-600"
          >
            info@celticwellness.ie
          </a>{" "}
          or call +353 85 140 7778.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
