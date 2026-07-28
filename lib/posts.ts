export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  image: string;
  category: string;
  body: PostBlock[];
  faqs?: { q: string; a: string }[];
};

/**
 * Blog content lives in the repo for now. Paragraphs support inline links
 * written as [text](/path). Keep claims educational and hedged; these are
 * food supplements under EU rules.
 */
export const posts: Post[] = [
  {
    slug: "shilajit-ireland-complete-guide",
    title: "Shilajit in Ireland: The Complete Guide",
    description:
      "What shilajit is, how it's traditionally used, what to look for when buying it in Ireland, and how to take resin, capsules, drops and gummies.",
    date: "2026-07-20",
    readingMinutes: 7,
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/CelticW_012JC-scaled-1.webp",
    category: "Shilajit",
    body: [
      {
        type: "p",
        text: "Shilajit has gone from an obscure Ayurvedic remedy to one of the most searched supplements in Ireland, and for good reason: few natural substances have a longer history of traditional use. This guide covers what it actually is, how to spot quality, and how to choose between the formats.",
      },
      { type: "h2", text: "What is shilajit?" },
      {
        type: "p",
        text: "Shilajit is a sticky, tar-like resin that seeps from rock in high mountain ranges, most famously the Himalayas. It forms over centuries as plant matter breaks down under pressure, leaving a dense concentrate of fulvic acid, humic compounds and trace minerals. In Ayurvedic tradition it has been used for centuries as a general tonic.",
      },
      { type: "h2", text: "How to spot quality" },
      {
        type: "ul",
        items: [
          "Purification and lab testing. Raw shilajit can carry heavy metals; reputable sellers purify the resin and test every batch. Never buy untested shilajit.",
          "Origin transparency. Himalayan and Altai sources are the established standards.",
          "Realistic pricing. Genuine purified resin is labour-intensive to produce; suspiciously cheap jars are usually cut or fake.",
          "Resin behaviour. Real resin softens in warm hands and dissolves fully in warm water without grit.",
        ],
      },
      { type: "h2", text: "Resin, capsules, drops or gummies?" },
      {
        type: "p",
        text: "Resin is the traditional, unprocessed format: dissolve a pea-sized amount in warm water. Our [Organic Himalayan Shilajit 20g](/product/organic-himalayan-shilajit-20g) is the purist's choice. If taste or convenience matters more, [capsules](/product/shilajit-capsules) give you a measured dose with zero prep, [drops](/product/shilajit-drops-50ml) mix into any drink, and gummies make the daily habit easiest to keep. The active ingredient is the same; pick the format you'll actually take consistently.",
      },
      { type: "h2", text: "How to take it" },
      {
        type: "p",
        text: "Most people take shilajit once daily in the morning, with or without food. Start with a smaller amount and build up. Consistency over weeks matters more than any single dose. As with any supplement, talk to a healthcare professional first if you are pregnant, breastfeeding or on medication.",
      },
      { type: "h2", text: "Buying shilajit in Ireland" },
      {
        type: "p",
        text: "Buy from an Irish retailer that publishes testing practices and ships tracked. Celtic Wellness stocks the full range of formats, lab-tested and shipped from Sligo to every county in 2 to 3 days. Browse the full [Shilajit collection](/product-category/shilajit) to compare formats.",
      },
    ],
    faqs: [
      {
        q: "Is shilajit legal in Ireland?",
        a: "Yes. Shilajit is sold as a food supplement in Ireland and the EU. Buy from retailers who purify and lab-test their product.",
      },
      {
        q: "How long does a 20g jar of resin last?",
        a: "At the typical 300 to 500mg daily serving, a 20g jar lasts roughly 6 weeks.",
      },
      {
        q: "Does shilajit taste bad?",
        a: "Resin has a strong, earthy, slightly bitter taste. If that puts you off, capsules and gummies avoid it entirely.",
      },
    ],
  },
  {
    slug: "shilajit-resin-vs-capsules-vs-gummies",
    title: "Shilajit Resin vs Capsules vs Gummies: Which Format Fits You?",
    description:
      "An honest comparison of shilajit formats: potency, convenience, taste, cost per serving and who each one actually suits.",
    date: "2026-07-12",
    readingMinutes: 5,
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/CelticW_004JC-scaled-1.jpg",
    category: "Shilajit",
    body: [
      {
        type: "p",
        text: "Every week customers ask us the same question: which shilajit should I buy? The answer depends less on the shilajit and more on you. Here is the honest comparison.",
      },
      { type: "h2", text: "Resin: the traditional standard" },
      {
        type: "p",
        text: "Raw purified resin is shilajit as it has been taken for centuries. You control the dose, nothing is added, and gram for gram it is usually the best value. The trade-off is ritual: you dissolve it in warm water and it has a strong earthy taste. Choose [resin](/product/organic-himalayan-shilajit-20g) if you want the unprocessed original and don't mind the routine.",
      },
      { type: "h2", text: "Capsules: set and forget" },
      {
        type: "p",
        text: "Capsules trade a little of the ritual for a lot of convenience: a measured dose, no taste, no prep. They suit anyone who already takes supplements with breakfast. See our [Shilajit Capsules](/product/shilajit-capsules).",
      },
      { type: "h2", text: "Drops: the flexible middle" },
      {
        type: "p",
        text: "[Drops](/product/shilajit-drops-50ml) dissolve instantly in water, tea or a smoothie. They suit people who want resin's flexibility without the dissolving step.",
      },
      { type: "h2", text: "Gummies and honey sticks: the habit builders" },
      {
        type: "p",
        text: "The best supplement is the one you take. Gummies and [honey sticks](/product/shilajit-honey-sticks-classic) make the habit effortless and taste good doing it. They suit beginners and anyone who has abandoned a supplement routine before.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "ul",
        items: [
          "Want maximum tradition and value: resin.",
          "Want zero friction: capsules.",
          "Want flexibility in drinks: drops.",
          "Want the easiest habit to keep: gummies or honey sticks.",
        ],
      },
      {
        type: "p",
        text: "Whichever you pick, ours is purified, lab-tested and shipped tracked from Sligo. Compare the whole [Shilajit range](/product-category/shilajit).",
      },
    ],
  },
  {
    slug: "sea-moss-the-irish-tradition",
    title: "Sea Moss: The Irish Tradition Behind the Global Trend",
    description:
      "Sea moss went viral worldwide, but Ireland has been using carraigin for generations. What it is, what's in it, and how to take it.",
    date: "2026-07-05",
    readingMinutes: 5,
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/seamoss_capsules-scaled-1.webp",
    category: "Wellness",
    body: [
      {
        type: "p",
        text: "Sea moss might be trending on TikTok, but on this island it never needed a trend. Carraigin, or Irish moss, has been gathered on Atlantic shores and used in Irish kitchens for generations, most famously simmered into a traditional remedy during winter.",
      },
      { type: "h2", text: "What is sea moss?" },
      {
        type: "p",
        text: "Sea moss is a red seaweed (Chondrus crispus) that grows along rocky Atlantic coastlines, including Ireland's. It is naturally rich in minerals drawn from seawater, including iodine, which contributes to normal thyroid function and normal energy-yielding metabolism.",
      },
      { type: "h2", text: "Why capsules?" },
      {
        type: "p",
        text: "Traditional preparation means soaking and blending raw seaweed into a gel that lasts a few weeks in the fridge. Capsules skip all of that: a consistent daily amount, no taste, no prep. Our [Irish Sea Moss Supplement](/product/irish-sea-moss-supplement) delivers Atlantic sea moss in a simple daily capsule, and the [Sea Moss Blend](/product/celtic-wellness-sea-moss-blend-capsules-60-count) pairs it with complementary botanicals.",
      },
      { type: "h2", text: "A note on iodine" },
      {
        type: "p",
        text: "Sea moss is naturally high in iodine, and more is not better. Stick to the serving on the label, and talk to your GP before taking it if you have a thyroid condition or are pregnant or breastfeeding.",
      },
      {
        type: "p",
        text: "From the Atlantic tradition to your daily routine: explore our [sea moss supplements](/product-category/sea-moss-supplements), shipped tracked from Sligo.",
      },
    ],
  },
  {
    slug: "creatine-beginners-guide",
    title: "Creatine for Beginners: A No-Nonsense Guide",
    description:
      "Creatine is the most researched sports supplement in the world. What it does, who it's for, powder vs gummies, and how to take it.",
    date: "2026-06-24",
    readingMinutes: 6,
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/Creatine-Monohydrate.jpg",
    category: "Training",
    body: [
      {
        type: "p",
        text: "If you only ever take one training supplement, the research says it should probably be creatine monohydrate. It is one of the most studied supplements in sports science, with decades of evidence behind its role in physical performance.",
      },
      { type: "h2", text: "What creatine actually does" },
      {
        type: "p",
        text: "Creatine helps your muscles regenerate ATP, the energy currency used in short, intense efforts. In practice, daily creatine intake increases physical performance in successive bursts of short-term, high-intensity exercise, which is why it is a staple for gym-goers, sprinters and team-sport athletes.",
      },
      { type: "h2", text: "Who is it for?" },
      {
        type: "p",
        text: "Anyone doing resistance training or repeated high-intensity work. It is equally relevant for men and women, and vegetarians often notice the most difference since dietary creatine comes mainly from meat and fish.",
      },
      { type: "h2", text: "How to take it" },
      {
        type: "ul",
        items: [
          "3 to 5g daily, every day, training day or not. Consistency is the whole game.",
          "No loading phase needed; it just gets you there a couple of weeks faster.",
          "Timing barely matters. Take it whenever you'll remember.",
          "Drink normally through the day; creatine draws water into muscle tissue.",
        ],
      },
      { type: "h2", text: "Powder or gummies?" },
      {
        type: "p",
        text: "[Powder](/product/creatine-monohydrate-powder-240g) is the classic: cheapest per serving, mixes into anything. [Gummies](/product/creatine-monohydrate-gummies-120-gummies) cost a little more but remove every excuse to skip a day. Both are pure creatine monohydrate, the form used in nearly all of the research.",
      },
      {
        type: "p",
        text: "Both ship tracked from Sligo with free delivery over €50. Start with whichever you'll take every day.",
      },
    ],
  },
  {
    slug: "electrolytes-when-you-need-them",
    title: "Electrolytes Explained: When You Actually Need Them",
    description:
      "Sodium, potassium and magnesium do real work. When electrolyte drinks genuinely help, when water is enough, and how to use sachets well.",
    date: "2026-06-15",
    readingMinutes: 5,
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/Electrolyte_Drink_Mix.webp",
    category: "Wellness",
    body: [
      {
        type: "p",
        text: "Electrolyte drinks are everywhere now, from marathon aid stations to office desks. Sometimes they are exactly what your body needs; sometimes plain water does the same job for free. Here is how to tell the difference.",
      },
      { type: "h2", text: "What electrolytes do" },
      {
        type: "p",
        text: "Electrolytes are minerals that carry an electric charge in your body fluids: chiefly sodium, potassium and magnesium. They regulate fluid balance, and magnesium additionally contributes to normal muscle function and the reduction of tiredness and fatigue. You lose them primarily through sweat.",
      },
      { type: "h2", text: "When they genuinely help" },
      {
        type: "ul",
        items: [
          "Long or sweaty training sessions, roughly an hour or more of hard effort.",
          "Hot days, saunas and heavy manual work.",
          "Illness with fluid loss, when rehydration matters most.",
          "Low-carb or fasted phases, when the body sheds sodium faster.",
        ],
      },
      { type: "h2", text: "When water is enough" },
      {
        type: "p",
        text: "A 30-minute walk or a normal day at a desk does not deplete electrolytes meaningfully. Save the sachets for when you sweat properly; your wallet and your sugar intake will both thank you.",
      },
      { type: "h2", text: "Choosing a mix" },
      {
        type: "p",
        text: "Look for a sugar-free mix with meaningful sodium, potassium and magnesium rather than a sugary sports drink with token minerals. Our [Electrolyte Drink Mix](/product/electrolyte-drink-mix-single-sachet) is naturally flavoured and sugar free: one sachet into 500ml of water. Try a single sachet first, then the [4-flavour pack](/product/celtic-wellness-4-flavor-electrolytes-pack) if it earns its place in your routine.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
