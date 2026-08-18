import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Refunds & Returns",
  description:
    "Celtic Wellness returns policy: 14 days to request a return on unused items in original packaging.",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Refunds and returns"
      intro="Not right for you? Here is how returns work."
    >
      <InfoSection heading="Return window">
        <p>
          You have 14 days from purchase to request a return. After that, we
          can&rsquo;t offer a full refund or exchange.
        </p>
      </InfoSection>

      <InfoSection heading="Conditions">
        <p>
          To be eligible, items must be unused and in the same condition you
          received them, and in the original packaging.
        </p>
        <p>
          Some items can&rsquo;t be returned: perishable goods such as food and
          supplements, gift cards, and certain health and personal care items.
          Only regular-priced items are refundable, sale items are final sale.
        </p>
      </InfoSection>

      <InfoSection heading="Process">
        <p>
          Email{" "}
          <a
            href="mailto:info@celticwellness.ie"
            className="text-pine-700 underline underline-offset-2 hover:text-pine-600"
          >
            info@celticwellness.ie
          </a>{" "}
          with your order number to start a return. Once we receive and review
          the return, we will email you to confirm approval or rejection. If
          approved, your refund will be processed and credited to your original
          payment method within a few days.
        </p>
      </InfoSection>

      <InfoSection heading="Partial refunds">
        <p>
          Partial refunds may apply when items are not in original condition,
          damaged, or missing parts for reasons not due to our error, or when
          returned after the 14 day window.
        </p>
      </InfoSection>

      <InfoSection heading="Return shipping">
        <p>
          Return shipping costs are the customer&rsquo;s responsibility and are
          non-refundable. Where a refund is issued for a returned order, return
          shipping costs are deducted.
        </p>
      </InfoSection>

      <InfoSection heading="Exchanges">
        <p>We replace items only if they arrive defective or damaged.</p>
      </InfoSection>
    </InfoPage>
  );
}
