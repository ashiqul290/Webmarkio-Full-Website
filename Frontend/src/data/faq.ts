import type { FAQItem } from "../types";

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How long does it take to build a website?",
    answer: "Project timelines vary based on scope and complexity. A Starter website typically takes 3-4 weeks. A Business website takes 6-8 weeks. Premium and Enterprise projects range from 10-16 weeks. We'll provide a specific timeline during our initial consultation.",
    category: "Process",
  },
  {
    id: "2",
    question: "What's included in the post-launch support?",
    answer: "Post-launch support includes bug fixes, minor content updates, performance monitoring, and technical support via email and Slack. We monitor your site daily and address any issues within 24 hours during business hours. Extended support packages are available.",
    category: "Process",
  },
  {
    id: "3",
    question: "Do I own the website once it's complete?",
    answer: "Absolutely. You own 100% of your website, code, and all associated assets upon final payment. We transfer all files, credentials, and access immediately. We believe your digital property should be fully yours.",
    category: "Ownership",
  },
  {
    id: "4",
    question: "What happens if I'm not happy with the design?",
    answer: "Each package includes a defined number of revision rounds. We share work in progress early and often to ensure alignment before investing heavily in any direction. In our 7 years, we've never had a client who wasn't satisfied with the final result.",
    category: "Process",
  },
  {
    id: "5",
    question: "Do you offer payment plans?",
    answer: "Yes. For projects over $3,000, we offer split payment options: typically 40% upfront, 30% at design approval, and 30% at launch. Enterprise projects can be structured with milestone-based payments. We also accept major credit cards, bank transfers, and ACH.",
    category: "Pricing",
  },
  {
    id: "6",
    question: "Will my website work on all devices and browsers?",
    answer: "Yes. We test every website across Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile devices. We follow responsive design best practices and test on actual physical devices, not just browser simulators.",
    category: "Technical",
  },
  {
    id: "7",
    question: "Do you provide hosting and domain registration?",
    answer: "We can manage hosting and domain setup for you, or work with your existing providers. We recommend Vercel or Netlify for static sites, and AWS or DigitalOcean for dynamic applications. We'll provide recommendations based on your traffic and technical requirements.",
    category: "Technical",
  },
  {
    id: "8",
    question: "Can you redesign my existing website?",
    answer: "Absolutely. Redesigns are a significant portion of our work. We start with a thorough audit of your current site—analytics, user behavior, SEO status—then build a strategy to improve on every metric while preserving what's working.",
    category: "Process",
  },
  {
    id: "9",
    question: "Do you work with clients outside of your country?",
    answer: "Yes, we work with clients worldwide. Our team is fully distributed and experienced with remote collaboration. We use Figma, Notion, Slack, and Zoom for seamless project management and communication across time zones.",
    category: "Process",
  },
  {
    id: "10",
    question: "What makes WebMarkio different from other agencies?",
    answer: "Three things: strategy first (we think like business consultants, not just designers), obsessive craft (every pixel and line of code matters), and results focus (we measure success by your business outcomes, not just deliverables). We have 200+ successful projects and an NPS of 78.",
    category: "General",
  },
  {
    id: "11",
    question: "How do you handle SEO during the build?",
    answer: "SEO is baked into our process from day one—not an afterthought. We optimize page structure, metadata, schema markup, site speed, and internal linking during development. Every package includes baseline SEO setup. Advanced SEO is available as a standalone service.",
    category: "Marketing",
  },
  {
    id: "12",
    question: "Can you integrate with my existing tools?",
    answer: "Yes. We regularly integrate with CRM systems (HubSpot, Salesforce), email platforms (Mailchimp, ActiveCampaign), payment processors (Stripe, Square), booking systems, ERP platforms, and custom APIs. Tell us what you use and we'll make it work.",
    category: "Technical",
  },
];

export const faqCategories = ["All", "Process", "Pricing", "Technical", "Ownership", "Marketing", "General"];
