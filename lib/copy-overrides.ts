/**
 * Frontend copy overrides, applied in the data layer (lib/woo.ts).
 *
 * The live WordPress descriptions for these products contain ChatGPT HTML
 * artifacts and non-compliant claims (see docs/product-copy-rewrites.md).
 * Until the rewrites are pasted into Woo admin, the new storefront overrides
 * them here so shoppers only ever see the clean, EU-claim-compliant copy.
 *
 * Once the copy is updated in WordPress itself, entries here can be deleted.
 * Keyed by Woo product ID.
 */

type CopyOverride = {
  shortDescription: string;
  description: string;
};

export const COPY_OVERRIDES: Record<number, CopyOverride> = {
  // Organic Himalayan Shilajit 20g
  427: {
    shortDescription:
      "Pure Himalayan shilajit resin, the most traditional way to take it. Purified, lab-tested and rich in naturally occurring fulvic acid and trace minerals.",
    description:
      "Shilajit resin is the original format: raw, potent and unprocessed. Ours is harvested at high altitude in the Himalayas, then purified and lab-tested for heavy metals so every jar meets the standard we would take ourselves.\n\nHow to use: Dissolve a pea-sized portion (300 to 500mg) in warm water, tea or milk once daily, ideally in the morning. Start smaller if you are new to shilajit and build up. The included spoon makes dosing easy.\n\nWhy resin over capsules? Nothing added, nothing hidden. You see exactly what you are taking, and a 20g jar at the standard dose lasts around 6 weeks.\n\nConsult a healthcare professional before use if pregnant, breastfeeding or on medication. Food supplements are not a substitute for a varied diet.",
  },
  // Shilajit Capsules
  448: {
    shortDescription:
      "All the convenience, none of the taste. Himalayan shilajit in a precise daily capsule, lab-tested for purity.",
    description:
      "Love the idea of shilajit but not the ritual? Capsules give you a measured dose of the same purified Himalayan shilajit with zero prep and zero earthy taste.\n\nHow to use: 1 to 2 capsules daily with water, morning or early afternoon. Consistency matters more than timing; take it with breakfast and forget about it.\n\nEvery batch is tested for purity and potency. Consult a healthcare professional before use if pregnant, breastfeeding or on medication.",
  },
  // Pure Himalayan Shilajit Gummies
  425: {
    shortDescription:
      "Shilajit for people who hate swallowing capsules. A tasty daily gummy with authentic Himalayan shilajit, lab-tested for purity.",
    description:
      "The easiest way into shilajit. Each gummy carries authentic, purified Himalayan shilajit in a format you will actually remember to take.\n\nHow to use: 1 to 2 gummies daily, morning or early afternoon.\n\nLab-tested for purity and potency. Consult a healthcare professional before use if pregnant, breastfeeding or on medication.",
  },
  // Irish Sea Moss Supplement
  406: {
    shortDescription:
      "Atlantic sea moss in a convenient daily capsule. A traditional Irish source of naturally occurring minerals, including iodine, sustainably harvested and lab-tested.",
    description:
      "Sea moss has been part of Irish coastal tradition for generations. Ours is sustainably sourced from the Atlantic and delivered in a simple daily capsule, carrying the naturally occurring minerals sea moss is known for, including iodine, which contributes to normal thyroid function and normal energy-yielding metabolism.\n\nHow to use: 1 to 2 capsules daily with water, ideally with food.\n\nLab-tested for purity. Consult a healthcare professional before use if pregnant, breastfeeding or on medication, particularly if you have a thyroid condition.",
  },
  // Maca Root Supplement
  403: {
    shortDescription:
      "Pure Peruvian maca root in a daily capsule. A traditional Andean staple, lab-tested and sustainably sourced.",
    description:
      "Maca is a root vegetable grown high in the Peruvian Andes, used there as a food staple for centuries. Our capsules contain 100% pure maca root, nothing else, lab-tested for purity and potency.\n\nHow to use: 1 to 2 capsules daily with water, ideally in the morning or with meals.\n\nConsult a healthcare professional before use if pregnant, breastfeeding or on medication.",
  },
  // Moringa Powder
  405: {
    shortDescription:
      "100% organic moringa leaf powder. A nutrient-dense green powder for smoothies, teas and meals, naturally rich in vitamins and minerals.",
    description:
      "Moringa leaves are one of the most nutrient-dense greens you can add to your day. Ours are organically grown, carefully dried to protect the nutrients, and milled to a fine powder. Naturally contains vitamin A, which contributes to the normal function of the immune system.\n\nHow to use: Add 1 to 2 teaspoons to smoothies, juice or warm (not boiling) water, or sprinkle over food. Expect a fresh, green, spinach-like taste.\n\nConsult a healthcare professional before use if pregnant, breastfeeding or on medication.",
  },
  // Keto Supplement
  404: {
    shortDescription:
      "Daily support formulated for low-carb and ketogenic lifestyles. Clean ingredients, lab-tested, made to slot into your routine.",
    description:
      "Formulated for people running a ketogenic or low-carb lifestyle who want their supplement stack as disciplined as their diet. Clean ingredients, lab-tested, no sugar.\n\nHow to use: 1 to 2 capsules daily with water, ideally before meals.\n\nFood supplements are not a substitute for a varied, balanced diet. Consult a healthcare professional before use if pregnant, breastfeeding or on medication.",
  },
  // Silver Hydrogen Water Generator
  426: {
    shortDescription:
      "A portable generator that infuses your drinking water with molecular hydrogen in minutes, built with silver electrode technology.",
    description:
      "Fill it with clean, filtered water, switch it on, and in a few minutes you have hydrogen-rich water ready to drink. Compact enough for a desk or gym bag, durable enough for daily use.\n\nIn the box: the generator, charging cable and full instructions.\n\nHow to use: Fill, run a cycle, drink immediately for best results. Use daily as part of your hydration routine.",
  },
};
