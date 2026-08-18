import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Delivery Information",
  description:
    "Celtic Wellness delivery: shipped within 24 hours via An Post, tracked to your door, free over €50.",
};

export default function DeliveryPage() {
  return (
    <InfoPage
      title="Delivery information"
      intro="Everything you need to know about how your order gets to you."
    >
      <InfoSection heading="Dispatch">
        <p>
          All orders are processed and shipped within 24 hours of purchase.
          You will receive a tracking number for every order so you can follow
          it to your door.
        </p>
      </InfoSection>

      <InfoSection heading="Shipping costs">
        <p>
          Delivery is a flat rate of €5.95 per order, and free on orders over
          €50.
        </p>
      </InfoSection>

      <InfoSection heading="Delivery times">
        <p>
          We deliver via An Post. Typical delivery takes 2 to 5 business days
          after dispatch, depending on your location, and most orders arrive
          within 2 to 3 days. We are not responsible for delays caused by An
          Post, but if something looks stuck, get in touch and we will chase
          it.
        </p>
      </InfoSection>

      <InfoSection heading="Where we ship">
        <p>Currently, we ship to Ireland only.</p>
      </InfoSection>

      <InfoSection heading="Questions">
        <p>
          For anything delivery related, email{" "}
          <a
            href="mailto:info@celticwellness.ie"
            className="text-pine-700 underline underline-offset-2 hover:text-pine-600"
          >
            info@celticwellness.ie
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
