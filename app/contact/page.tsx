import type { Metadata } from "next";
import { EnvelopeSimple, Phone, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Celtic Wellness in Sligo, Ireland. Real people, no automated replies.",
};

const CARDS = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: "info@celticwellness.ie",
    href: "mailto:info@celticwellness.ie",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+353 85 140 7778",
    href: "tel:+353851407778",
  },
  {
    icon: MapPin,
    label: "Registered address",
    value:
      "Celtic Wellness LTD, Tenure Business Park, Monasterboice, Drogheda, Co. Louth, A92 NHY5",
  },
  {
    icon: Clock,
    label: "Dispatch",
    value: "All orders are processed and shipped within 24 hours of purchase.",
  },
];

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact us"
      intro="We want to hear from you. Whether you have a question about our supplements or just want to say hello, get in touch. Celtic Wellness is based in Sligo, Ireland, and we answer every message ourselves. No robots. No automated replies. Just real people who care about your health."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-card border border-bone-200 bg-bone-100/50 p-5"
          >
            <card.icon size={22} className="text-pine-600" />
            <p className="mt-3 text-sm font-semibold">{card.label}</p>
            {card.href ? (
              <a
                href={card.href}
                className="mt-1 block text-sm text-pine-700 underline underline-offset-2 hover:text-pine-600"
              >
                {card.value}
              </a>
            ) : (
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {card.value}
              </p>
            )}
          </div>
        ))}
      </div>

      <InfoSection heading="Order queries">
        <p>
          Include your order number if your message is about an existing order,
          it helps us sort things faster. For anything delivery related, see
          our delivery information page first, most questions are answered
          there.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
